const comic = {
    allcomic: (req, res) => {
        // if(!req.headers.cookie){ //chualogin
            const numpage = require('url').parse(req.url,true).query.page
            const cookies = req.headers.cookie 
            const numbercomicshow =20

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
                    const sql=`SELECT comics.* FROM lastupdatedcomic INNER JOIN comics ON lastupdatedcomic.id = comics.id ORDER BY lastupdatedcomic.updatetime DESC LIMIT ${numbercomicshow} OFFSET ${OF_num};`
                
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
                                    return res.render('home', { cookies: false,comics:result,topcomic:resulttopcomic,topuser:resulttopuser,bannercomic:resultreviewcomic,num:num/20})
                                }else{
                                    return res.render('home', { cookies: cookies,comics:result,topcomic:resulttopcomic,topuser:resulttopuser,bannercomic:resultreviewcomic,num:num/20})
                                }
                            })
                        })
                    })
                })
                }else{
                    var OF_num =numbercomicshow* (numpage-1)
                    const sql=`SELECT comics.* FROM lastupdatedcomic INNER JOIN comics ON lastupdatedcomic.id = comics.id ORDER BY lastupdatedcomic.updatetime DESC LIMIT ${numbercomicshow} OFFSET ${OF_num};`
                
                    conToDb.query(sql, (err, result) => {
                        if (err) console.log(err)
                        conToDb.end()
                        return res.send(result)
                    })
                }

            })
      
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
        const SQL =`SELECT c.*,CONCAT("[",GROUP_CONCAT(comic SEPARATOR','),"]") AS listid,ltag.listtag,mxcm.maxid,mxcm.minid FROM comics as c LEFT JOIN( SELECT comicid, JSON_OBJECT("id", id, "name", NAME) AS comic FROM chapters ) AS ch ON ch.comicid = c.id JOIN(SELECT CONCAT("[",GROUP_CONCAT(ltg.tag_ls SEPARATOR','),"]") AS listtag FROM(SELECT comicid,JSON_OBJECT("tagid", tags.tagid, "tagname",tags.tagname)as tag_ls FROM comics_tags as cmt LEFT JOIN tags ON cmt.tagid = tags.tagid WHERE cmt.comicid =${req.params.id})as ltg)as ltag JOIN(SELECT max(id) as maxid,min(id) as minid FROM chapters WHERE chapters.comicid =${req.params.id} )as mxcm WHERE c.id=${req.params.id};`
    
        conToDb.query(SQL, (err, listchap) => {
            if (err) console.log(err)

            if (listchap[0].id){

                listchap[0].listid=(JSON.parse(listchap[0].listid))
                listchap[0].listtag=(JSON.parse(listchap[0].listtag))

                const sqlcmt =`SELECT cmt.id,cmt.parent_id,cmt.topic_id,cmt.user_id,cmt.content,DATE_FORMAT(cmt.timestampe, '%H:%i  %d-%m-%Y') as timecmt,users.avatar,users.username,users.fullname FROM comics__comment as cmt LEFT JOIN users ON cmt.user_id = users.userid WHERE cmt.topic_id = '${listchap[0].topiccomment_id}'  AND cmt.parent_id is null ORDER BY cmt.timestampe DESC;`
                    conToDb.query(sqlcmt, (err, resuilcmt) => {
                        if (err) console.log(err)

                        const sqlrepcmt =`SELECT cmt.id,cmt.parent_id,cmt.topic_id,cmt.user_id,cmt.content,DATE_FORMAT(cmt.timestampe, '%H:%i  %d-%m-%Y') as timecmt,users.avatar,users.username,users.fullname FROM comics__comment as cmt LEFT JOIN users ON cmt.user_id = users.userid WHERE cmt.topic_id = '${listchap[0].topiccomment_id}'  AND cmt.parent_id is not null ORDER BY cmt.timestampe;`
                        conToDb.query(sqlrepcmt, (err, resuilrepcmt) => {
                            if (err) console.log(err)
                            
                            if(currentId){
                                const sqlflc =`SELECT * FROM userfollowingcomics WHERE comicid=${req.params.id} and userid=${currentId};`
                                conToDb.query(sqlflc, (err, resuilfollow) => {
                                    if (err) console.log(err)
                        
                                    conToDb.end() 
                                    if(resuilfollow[0]){
                                        return res.render('comic', { cookies: cookies,comics: listchap[0],userid:currentId,follow:true,comment:resuilcmt,repcomment:resuilrepcmt})
                                    }else{
                                        return res.render('comic', { cookies: cookies,comics: listchap[0],userid:currentId,follow:false,comment:resuilcmt,repcomment:resuilrepcmt})
                                    }
                                })
                            }else{
                                return res.render('comic', { cookies: cookies,comics: listchap[0],follow:false,comment:resuilcmt,repcomment:resuilrepcmt})
                            }
                        })

                    })
            }else{
                res.redirect("/")
            }
        })
    },

    chapter:(req, res) => {//nay la show chap
        const userid = req.body.currentId
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const idcomic = req.params.comic
        const idchap = req.params.id
        
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
        if(!idcomic || !idchap){
            res.redirect("/")
        }else{
               // connected to mysql successfully
               const sql = `select c.*,lc.listid as listchap from chapters as c LEFT JOIN ( SELECT cm.id ,CONCAT("[",GROUP_CONCAT(comic SEPARATOR','),"]") AS listid FROM comics as cm LEFT JOIN(SELECT comicid, JSON_OBJECT("id", id, "name", NAME) AS comic FROM chapters ) AS ch ON ch.comicid = cm.id WHERE cm.id =${idcomic} )as lc ON lc.id = c.comicid WHERE c.id = ${idchap};`
               conToDb.query(sql, (err, result) => {
                    if (err) console.log(err)

                    if(result[0]){
                        result[0].uri=result[0].uri.split(",")
                       result[0].listchap=(JSON.parse(result[0].listchap))

                       const sqlcmt =`SELECT cmt.id,cmt.parent_id,cmt.topic_id,cmt.user_id,cmt.content,DATE_FORMAT(cmt.timestampe, '%H:%i  %d-%m-%Y') as timecmt,users.avatar,users.username,users.fullname FROM chapters__comment as cmt LEFT JOIN users ON cmt.user_id = users.userid WHERE cmt.topic_id = '${result[0].topiccomment_id}'  AND cmt.parent_id is null ORDER BY cmt.timestampe DESC;;`
                       conToDb.query(sqlcmt, (err, resuilcmt) => {
                           if (err) console.log(err)

                           const sqlrepcmt =`SELECT cmt.id,cmt.parent_id,cmt.topic_id,cmt.user_id,cmt.content,DATE_FORMAT(cmt.timestampe, '%H:%i  %d-%m-%Y') as timecmt,users.avatar,users.username,users.fullname FROM chapters__comment as cmt LEFT JOIN users ON cmt.user_id = users.userid WHERE cmt.topic_id = '${result[0].topiccomment_id}' AND cmt.parent_id is not null ORDER BY cmt.timestampe;`
                            conToDb.query(sqlrepcmt, (err, resuilrepcmt) => {
                                if (err) console.log(err)

                                
                                // const sqlview =`UPDATE comics SET views = views + 1 WHERE id=${idcomic}`
                                // conToDb.query(sqlview, (err, views) => {
                                //     if (err) console.log(err)
        
                                //     if(userid){
                                //         const sqlhistory =`INSERT INTO userreadchapters (userid,chapterid) VALUES (${userid}, ${req.params.id})`
                                //         conToDb.query(sqlhistory, (err, read) => {
                                //             if (err) res.render("chapter",{ cookies: true ,chapter: result[0]})
        
                                //             conToDb.end() 
                                //             res.render("chapter",{ cookies: true ,chapter: result[0]})
                                //         })
                                    
                                //     }else{
                                //         conToDb.end() 
                                //         res.render("chapter",{ cookies: false ,chapter: result[0]})
                                //     }
                                // })
                                res.render("chapter",{ cookies: true ,chapter: result[0],comment:resuilcmt,repcomment:resuilrepcmt})
                            })
                        })
                    }else{
                        res.redirect("/")
                    }
               })
        }
    },
    chapterapi:(req, res) => {//nay la show chap
        const userid = req.body.currentId
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");

        const idchap = req.params.chap

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
        if(!idchap){
            return null
        }else{
               // connected to mysql successfully
               const sql = `select * from chapters where id = ${idchap};`
               conToDb.query(sql, (err, result) => {
                   if (err) console.log(err)
                   
                       if(result[0]){
                           result[0].uri=result[0].uri.split(",")
                           return res.render("changechapter",{ cookies: true ,chapter: result[0]})
                       }else{
                           return null
                       }
               })
        }
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
            console.log(sql)
            conToDb.query(sql, (err, result) => {
                if (err) console.log(err)
                conToDb.end()   
                return "true"
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
            return true
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
    comiccomment: (req,res) =>{
        const{content,topicid,currentId,parentid}=req.body
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
        let newcmt = `INSERT INTO comics__comment ( parent_id, topic_id, user_id, content) VALUES (${parentid}, '${topicid}', ${currentId}, '${content}')`
        if(!parentid){
            newcmt =  `INSERT INTO comics__comment ( parent_id, topic_id, user_id, content) VALUES (NULL, '${topicid}', ${currentId}, '${content}')`
        }
       
        conToDb.query(newcmt, (err, comment) => {
            if (err) return res.send(false)

            return res.send(true)
        })
    },
    chaptercomment: (req,res) =>{
        const{content,topicid,currentId,parentid}=req.body
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
        let newcmt = `INSERT INTO chapters__comment ( parent_id, topic_id, user_id, content) VALUES (${parentid}, '${topicid}', ${currentId}, '${content}')`
        if(!parentid){
            newcmt =  `INSERT INTO chapters__comment ( parent_id, topic_id, user_id, content) VALUES (NULL, '${topicid}', ${currentId}, '${content}')`
        }

        console.log(newcmt)
        conToDb.query(newcmt, (err, comment) => {
            if (err) return res.send(false)

            return res.send(true)
        })
    },
    findcomic: (req, res) => {
       var textfind =req.query.find
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
        const sqlfind =`select * from comics WHERE name like("%${textfind}%");`
       
        conToDb.query(sqlfind, (err, listcomic) => {
            if (err) console.log(err)

            return res.send(listcomic)
        })
    },
    seachcategory: (req, res) => {
        const numpage = req.params.numpage
        const numbercomicshow =20
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");
        var OF_num =numbercomicshow* (numpage-1)
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
        const sqlfind =`select ct.*,t.tagname,t.tagid,t.taginf,c.name,c.views,c.image FROM comics_tags as ct LEFT JOIN tags as t ON t.tagid =ct.tagid LEFT JOIN comics as c ON ct.comicid =c.id WHERE ct.tagid = ${req.params.id} LIMIT ${numbercomicshow} OFFSET ${OF_num};`
        conToDb.query(sqlfind, (err, listcomic) => {
             if (err) console.log(err)

            const sqlfindtop =`select ct.*,c.name,c.views,c.image FROM comics_tags as ct LEFT JOIN comics as c ON ct.comicid =c.id WHERE ct.tagid = ${req.params.id} ORDER BY c.views DESC LIMIT 10;`
            conToDb.query(sqlfindtop, (err, listcomictop) => {
                if (err) console.log(err)

                const sqlcount =`SELECT count(comicid)as num FROM comics_tags WHERE tagid=${req.params.id}`
                conToDb.query(sqlcount, (err, num) => {
                    if (err) console.log(err)
                    console.log(num[0].num/20)
                    return [40,res.render("seach-category", { comics: listcomic,comicstop:listcomictop,infotag:listcomic[0],num:num[0].num/20})]
                })
            })
         })
     }
}

module.exports = comic