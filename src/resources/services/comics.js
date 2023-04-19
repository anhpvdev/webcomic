const comic = {
    allcomic: (req, res) => {
        // if(!req.headers.cookie){ //chualogin
            const numpage = require('url').parse(req.url,true).query.page
            const cookies = req.headers.cookie 

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
            // const sql = `SELECT * FROM comics;`

            conToDb.query("SELECT COUNT(id) as num FROM comics", (err, num) => {
                if (err) console.log(err)
                var num = num[0].num
                if(!numpage){
                    var OF_num = 0
                }else{
                    var OF_num =10* (numpage-1)
                }
           
                const sql=`SELECT comics.* FROM lastupdatedcomic INNER JOIN comics ON lastupdatedcomic.id = comics.id ORDER BY lastupdatedcomic.updatetime DESC LIMIT 10 OFFSET ${OF_num};`
                
                conToDb.query(sql, (err, result) => {
                    if (err) console.log(err)
                    
                    const sqltopcomic =`SELECT * FROM comics ORDER BY views DESC LIMIT 10`
                    conToDb.query(sqltopcomic, (err, resulttopcomic) => {
                        if (err) console.log(err)

                        const sqltopuser =`SELECT * FROM users ORDER BY Point DESC LIMIT 10`
                        conToDb.query(sqltopuser, (err, resulttopuser) => {
                            if (err) console.log(err)

                            const sqlreviewcomic =`SELECT * FROM comics ORDER BY id DESC LIMIT 10;`
                            conToDb.query(sqlreviewcomic, (err, resultreviewcomic) => {
                                if (err) console.log(err)
                                conToDb.end()
                                if(!req.headers.cookie){
                                    return res.render('home', { cookies: false,comics:result,topcomic:resulttopcomic,topuser:resulttopuser,bannercomic:resultreviewcomic,num:num})
                                }else{
                                    return res.render('home', { cookies: cookies,comics:result,topcomic:resulttopcomic,topuser:resulttopuser,bannercomic:resultreviewcomic,num:num})
                                }
                            })
                        })
                    })
                })
            })
        // }else{
        // const cookies = req.headers.cookie 
        // const{currentId} = req.body
        // const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        // const mysql = require("mysql");

        // const conToDb = mysql.createConnection({
        //     host: HOST || "localhost",
        //     user: USER || "sa",
        //     password: PASSWORD || "123123",
        //     database: DATABASE || "QUANLYNHANSU"
        // })
    
        // conToDb.connect((err) => {
        //     if (err) throw err;
        //     console.log("Connected to mysql")
        // })
        //      // connected to mysql successfully
        // // const sqlcomic = `SELECT * FROM comics ;`
        // const sqlcomic=`select comics.*,GROUP_CONCAT(chapters.id SEPARATOR',') AS listid,GROUP_CONCAT(chapters.name SEPARATOR',') AS listchap FROM comics LEFT JOIN chapters ON comics.id = chapters.comicid GROUP BY comics.id ORDER BY comics.id DESC;`
        // conToDb.query(sqlcomic, (err, resultcomic) => {
        //     if (err) console.log(err)

        //        const sqltopcomic =`SELECT * FROM comics ORDER BY views DESC LIMIT 7`
        //         conToDb.query(sqltopcomic, (err, resulttopcomic) => {
        //             if (err) console.log(err)

        //             const sqltopuser =`SELECT * FROM users ORDER BY Point DESC LIMIT 5`
        //             conToDb.query(sqltopuser, (err, resulttopuser) => {
        //                 if (err) console.log(err)

        //                 const sqlreviewcomic =`SELECT * FROM comics ORDER BY id DESC LIMIT 10;`
        //                     conToDb.query(sqlreviewcomic, (err, resultreviewcomic) => {
        //                         if (err) console.log(err)
        //                         conToDb.end() 

        //                         return res.render('home', { cookies: cookies,comics: resultcomic,topcomic:resulttopcomic,topuser:resulttopuser,bannercomic:resultreviewcomic})
        //                     })
                        
        //             })
        //     })
           
            
        // })
        // }
    },
    showcomic: (req, res) => {
        const cookies = req.headers.cookie 
        const {currentId} = req.body
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
        const SQL=`SELECT c.*,CONCAT("[",GROUP_CONCAT(comic SEPARATOR','),"]") AS listid FROM comics as c LEFT JOIN( SELECT comicid,id, JSON_OBJECT("id", id, "name", NAME) AS comic FROM chapters ) AS ch ON ch.comicid = c.id WHERE c.id=${req.params.id};`
        conToDb.query(SQL, (err, listchap) => {
            if (err) console.log(err)

            listchap[0].listid=(JSON.parse(listchap[0].listid))
            if(currentId){
                const sqlflc =`SELECT * FROM userfollowingcomics WHERE comicid=${req.params.id} and userid=${currentId};`
                conToDb.query(sqlflc, (err, resuilfollow) => {
                    if (err) console.log(err)
        
                    conToDb.end() 
                    if(resuilfollow[0]){
                        return res.render('comic', { cookies: cookies,comics: listchap[0],follow:true})
                    }else{
                        return res.render('comic', { cookies: cookies,comics: listchap[0],follow:false})
                    }
                })
            }else{
                return res.render('comic', { cookies: cookies,comics: listchap[0],follow:false})
            }
        })
    },

    chapter:(req, res) => {//nay la show chap
        const userid = req.body.currentId
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
        const sql = `SELECT chapterimages.chapterid,chapterimages.uri,chapters.name,chapters.comicid FROM chapterimages LEFT JOIN chapters ON chapters.id = chapterimages.chapterid WHERE chapterimages.chapterid=${req.params.id};`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)

            result[0].uri=result[0].uri.split(",")
            const idcomic = result[0].comicid
            // const style = result[0].Style
            const sqlview =`UPDATE comics SET views = views + 1 WHERE id=${idcomic}`
            conToDb.query(sqlview, (err, views) => {
                if (err) console.log(err)

                if(userid){
                    
                        const sqlhistory =`INSERT INTO userreadchapters (userid,chapterid) VALUES (${userid}, ${req.params.id})`
                        conToDb.query(sqlhistory, (err, read) => {
                            if (err) res.render("chapter",{ cookies: true ,chapter: result[0]})

                            conToDb.end() 
                            res.render("chapter",{ cookies: true ,chapter: result[0]})
                        })
                    
                }else{
                    conToDb.end() 
                    res.render("chapter",{ cookies: false ,chapter: result[0]})
                }
            })
        })
    },
    followcomic:(req, res) => {
        const {comicid, currentId} = req.body
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
        const sql = `INSERT INTO userfollowingcomics VALUES (${currentId},${comicid});`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.redirect(`/commic/${comicid}`)
        })
    },
    unfollowcomic:(req, res) => {
        const {comicid, currentId} = req.body
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
        const sql = `DELETE FROM userfollowingcomics WHERE comicid=${comicid} and userid=${currentId};`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.redirect(`/commic/${comicid}`)
        })
    },
    showfollowcomic: (req,res) =>{
        const{currentId}=req.body
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
        // connected
        // query
       const sql = `SELECT * from userfollowingcomics INNER JOIN comics ON userfollowingcomics.comicid = comics.id WHERE userid=${currentId}`
        conToDb.query(sql , (err, result) => {
           if (err) console.log(err)
           conToDb.end()
           console.log(result)
           res.render("followcomic_Detail",{listfollow:result,cookies: true})
        })
    },
    comment: (req,res) =>{
        const{comment,commicid,currentId}=req.body
        console.log(req.body)
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
        // connected
        // query
       const sql = `INSERT INTO comments VALUES (NULL, '0', '${currentId}', '${comment}', '${commicid}', current_timestamp());`
        conToDb.query(sql , (err, result) => {
           if (err) console.log(err)
           conToDb.end()
           const backcomic = "/commic/"+commicid
           console.log(backcomic)
           res.redirect(backcomic)
        })
    }
}

module.exports = comic