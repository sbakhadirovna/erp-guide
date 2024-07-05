const express = require("express");
const app = express();
const path = require("path");
const session=require('express-session')
const config=require('./shared/config')
var expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const routes=require("./routes")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout","layouts/main")

app.use("/static",express.static(path.join(__dirname,"..","public")))
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name:"session_id",
    secret:config.session.secret,
    saveUninitialized:false,
    resave:false,
    cookie:{
      httpOnly:true,
      maxAge:config.session.duration
    }
  })
)
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success"),
  res.locals.error=req.flash("error"),
  res.locals.warning=req.flash("warning")
 next()
})
app.use(routes);


app.get("/view",(req,res)=>{
  res.render("view")
})

app.use((req,res)=>{
  res.render('not-found',{layout:"layouts/auth"})
})
app.listen(config.port, () => {
  console.log(`${config.port}da ishlayapti`);
});
