const { kMaxLength } = require("buffer");

const adminServices = {
    login: async (req, res) => {
        const { admin_name, admin_password } = req.body
        if (!admin_name || !admin_password) { return res.render("admin-login", { message: "Nhập đầy đủ thông tin mới đăng nhập được chứ"}) } 

        // create connection 
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");
        const conToDb = mysql.createConnection({
        host: HOST ,
        user: USER ,
        password: PASSWORD ,
        database: DATABASE 
        })
        conToDb.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql")
        })
        // connected to mysql
        const sql = `SELECT * FROM admin WHERE admin_name="${admin_name}"`;
        await conToDb.query(sql, async (err, result) => {
            if (err) console.log(err)
           
            if (!result.length) { return res.render("admin-login", { message: `Không tìm thấy tài khoản ${admin_name}`}) }
            if (admin_password != result[0].admin_password) { return res.render("admin-login", { message: "mật khẩu không đúng rồi"}) }

            const jwt = require("jsonwebtoken")
            const token = await jwt.sign(admin_name, process.env.SECRET)

            const admin_credential = {
                admin_name,
                token: token
            }    

            const adminStatus = require("../sessions/adminStatus")
            // update admin status - admin_name
            adminStatus.admin_name = admin_name
            res.cookie("credential", JSON.stringify(admin_credential))
            res.redirect('/admin/commic')
        })
    },
    
    addcomic: (req, res) => { 
        const avt = req.file.filename
        console.log(avt)
        const { name, author,tag} = req.body
        console.log(name +"||"+author)


            // check name
        if (!name){
            return res.render("admin_commic", { message: "thiếu tên r"})
        }
            // check password and confirm password is not the same
        if (!avt) {
            return res.render("admin_commic", { message: "Thiếu ảnh r đcmm"})
        }
            // create connection to mysql
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const conToDb = mysql.createConnection({
            host: HOST || "localhost",
            user: USER || "sa",
            password: PASSWORD || "123123",
            database: DATABASE || "QUANLYNHANSU"
        })
    
        conToDb.connect((err) => {
            if (err) throw err;
            console.log("Connected to mysql")
        })
             // connected to mysql successfully
        const sql = `INSERT INTO comics(name,author,views,image) VALUES ('${name}', '${author}',0, '${avt}');`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)

            const sqlupdate = `INSERT INTO lastupdatedcomic(id) VALUES((SELECT max(id) FROM comics));`
            conToDb.query(sqlupdate, (err, update) => {
                if (err) console.log(err)
                conToDb.end() 
                return res.send(`Truyện:${name} ____ đã được hêm`)
            })
        })
            
    },
    addfolderchapter: (req, res) => { 
        const fs = require("fs")
        const path = require("path")
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const conToDb = mysql.createConnection({
            host: HOST || "localhost",
            user: USER || "sa",
            password: PASSWORD || "123123",
            database: DATABASE || "QUANLYNHANSU"
        })
    
        conToDb.connect((err) => {
            if (err) throw err;
            console.log("Connected to mysql")
        })
             // connected to mysql successfully
        const sql = `SELECT * FROM chapters WHERE id=(SELECT max(id) FROM chapters) `
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            const id = result[0].id +1
            const idname = id +""
            fs.mkdir(path.join("./src/public/image/chapter",idname),{},err=>{
                if(err) throw err
                conToDb.end() 
                return res.send(`Chap mới đã được thêm`)
            })
           
        })
    },
    addchapter:(req, res,next) => { 
        var listchap =""
        const {comic, name} = req.body
        for(i=0;i<req.files.length;i++){
            if(i==0){
                listchap += req.files[i].originalname
            }else{
                listchap +=","+req.files[i].originalname
            }
           
        }
        console.log(listchap.split(","))
            // create connection to mysql
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const conToDb = mysql.createConnection({
            host: HOST || "localhost",
            user: USER || "sa",
            password: PASSWORD || "123123",
            database: DATABASE || "QUANLYNHANSU"
        })
    
        conToDb.connect((err) => {
            if (err) throw err;
            console.log("Connected to mysql")
        })
             // connected to mysql successfully
        const sql = `INSERT INTO chapters(comicid,name) VALUES ('${comic}','${name}');`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)

            const sqlimguri = `INSERT INTO chapterimages(chapterid ,uri) VALUES ((select max(id) FROM chapters),'${listchap}');`
            conToDb.query(sqlimguri, (err, resulturi) => {
                if (err) console.log(err)

                const sqlupdate =`UPDATE lastupdatedcomic SET updatetime = now() WHERE id =${comic};`
                conToDb.query(sqlupdate, (err, resulturi) => {
                    if (err) console.log(err)
                    
                    conToDb.end()
                    next()
                })
            })
        })
    },

    deletecomic:(req, res) => { 
        const comicid = req.body.idcomic
        
            // create connection to mysql
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const conToDb = mysql.createConnection({
            host: HOST || "localhost",
            user: USER || "sa",
            password: PASSWORD || "123123",
            database: DATABASE || "QUANLYNHANSU"
        })
    
        conToDb.connect((err) => {
            if (err) throw err;
            console.log("Connected to mysql")
        })
             // connected to mysql successfully
        const sqldelete = `DELETE FROM comics WHERE id=${comicid};`
        conToDb.query(sqldelete, (err, resultdelete) => {
            if (err) console.log(err)            
        })
        const sql = `SELECT * FROM comics;`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.render("admin_commic", { isLoggedIn: true,comics:result})
        })
    },
    admincomic: (req, res) => {
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const conToDb = mysql.createConnection({
            host: HOST || "localhost",
            user: USER || "sa",
            password: PASSWORD || "123123",
            database: DATABASE || "QUANLYNHANSU"
        })
    
        conToDb.connect((err) => {
            if (err) throw err;
            console.log("Connected to mysql")
        })
             // connected to mysql successfully
        const sql = `SELECT * FROM comics;`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.render("admin_commic", { isLoggedIn: true,comics:result})
        })
    }

}

module.exports = adminServices