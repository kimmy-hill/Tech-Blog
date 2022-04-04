const router = require('express').Router();
const { Blog } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "content", "title", "createdAt"],
      order: [
        ['createdAt', 'DESC'],
      ],
    })

    console.log("TEST" + blogData)
    if (!blogData) {
      res.status(404).json({
        message: "No post found with this id"
      });
      return;
    }

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)

    res.render('dash', {
      blogs,
      loggedIn: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/newblog", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('newblog', {
    loggedIn: req.session.logged_in
  });
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "createdAt"],
    })

    if (!blogData) {
      res.status(404).json({
        message: "No post found with this id"
      });
      return;
    }

    const blog = blogData.get({ plain: true });
    console.log(blog)

    res.render('update', {
      blog,
      loggedIn: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/newblog", async (req, res) => {
  const user_id = req.session.user_id
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: user_id
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.put("/:id", async (req, res) => {
  const user_id = req.session.user_id
  try {
    const updateBlog = await Blog.update({
      title: req.body.title,
      content: req.body.content,
    }, {
      where: {
        id: req.params.id
      }
    });

    if (!updateBlog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const delBlog = await Blog.destroy({
      where: {
        id: req.body.blog_id
      }
    });

    if (!delBlog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(delBlog);
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = router;