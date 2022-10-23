CREATE TABLE `react_swtool` (
 `swt_code` varchar(100) NOT NULL COMMENT 'SW툴 코드',
 `swt_toolname` varchar(100) DEFAULT NULL COMMENT '툴 이름',
 `swt_function` text COMMENT '상세 기능',
 `swt_imagepath` varchar(100) DEFAULT NULL COMMENT '라벨 이미지 경로',
 `swt_big_imgpath` varchar(100) DEFAULT NULL COMMENT '메인 이미지 경로',
 `swt_comments` text COMMENT '설명',
 `swt_demo_site` varchar(100) DEFAULT NULL COMMENT '데모 URL',
 `swt_manual_path` varchar(100) DEFAULT NULL COMMENT '메뉴얼 파일 경로',
 `swt_github_url` varchar(100) DEFAULT NULL COMMENT 'Github URL',
 `reg_date` varchar(100) DEFAULT NULL COMMENT ' 등록날짜',
 `reg_user` varchar(100) DEFAULT NULL COMMENT ' 등록자',
 `update_date` varchar(100) DEFAULT NULL COMMENT ' 수정날짜',
 `update_user` varchar(100) DEFAULT NULL COMMENT ' 수정자',
 PRIMARY KEY (`swt_code`)
) engine=innodb default character set = utf8;

-- use react;
INSERT INTO `react_swtool` VALUES ('USW20200101000000', '툴 이름1', '상세 기능1', '20200101000000_라벨 이미
지.png'
, '20200101000000_메인 이미지.png', '설명1', '데모 URL1', '20200101000000_메뉴얼 파일.docx', 'Github URL1'
, '20200101000000', 'userA1`', '20200102000000', 'userB1');
INSERT INTO `react_swtool` VALUES ('USW20200102000000', '툴 이름2', '상세 기능2', '20200102000000_라벨 이미
지.png'
, '20200102000000_메인 이미지.png', '설명2', '데모 URL2', '20200102000000_메뉴얼 파일.docx', 'Github URL2'
, '20200102000000', 'userA2`', '20200103000000', 'userB2');
select * from react_swtool;

      SELECT 
        swt_code
        , swt_toolname
        , swt_function
        , swt_imagepath
        , swt_big_imgpath
        , swt_comments
        , swt_demo_site
        , swt_manual_path
        , swt_github_url
        , reg_date
      FROM react.react_swtool
      ORDER BY update_date DESC;
      


use react;
select * from react_user;

CREATE TABLE `react_user` (
 `username` varchar(100) DEFAULT NULL COMMENT '사용자 이름',
 `userorg` varchar(100) DEFAULT NULL COMMENT '소속기관',
 `useremail` varchar(100) COMMENT '이메일',
 `userpassword` varchar(100) DEFAULT NULL COMMENT '로그인 비밀번호',
 `usermajor` varchar(100) DEFAULT NULL COMMENT '전공',
 `userphone` varchar(100) DEFAULT NULL COMMENT '휴대전화번호',
 `userflag` varchar(100) DEFAULT NULL COMMENT '승인여부',
 `reg_date` varchar(100) DEFAULT NULL COMMENT '등록날짜',
 `reg_user` varchar(100) DEFAULT NULL COMMENT '등록자',
 `update_date` varchar(100) DEFAULT NULL COMMENT '수정날짜',
 `update_user` varchar(100) DEFAULT NULL COMMENT '수정자',
 PRIMARY KEY (`useremail`)
);
ALTER TABLE react.react_user convert to charset utf8;

use react;
CREATE TABLE `userBoard` (
`bid` varchar(100) NOT NULL COMMENT 'board-id',
`title` varchar(100) DEFAULT NULL COMMENT 'title',
`content` text COMMENT 'content',
`reg_date` varchar(100) DEFAULT NULL COMMENT ' 등록날짜',
`reg_user` varchar(100) DEFAULT NULL COMMENT ' 등록자',
`update_date` varchar(100) DEFAULT NULL COMMENT ' 수정날짜',
`update_user` varchar(100) DEFAULT NULL COMMENT ' 수정자'
) engine=innodb default character set = utf8;
commit;


alter table userBoard Modify bid int not null Auto_Increment;
alter table userBoard ADD column viewcount int;
alter table userBoard modify column viewcount int default 0;

update userBoard set viewcount = viewcount + 1 where bid = 24;
select * from userBoard order by bid desc;

set sql_safe_updates=0;
delete from userBoard where bid is null;

insert into userBoard(bid,title,content) values('1','title1','content1');
insert into userBoard(bid,title,content) values('2','title2','content2');

select * from userboard order by bid desc;
delete from userboard where bid = 0;

select * from react_user;

insert into react_user (username,userorg,useremail,userpassword) values ('1q2w3e4r!','1q2w3e4r!','qwer@naver.com','$2a$10$9AVdCl/uZ90r3J7DhJCw8.HcC.DD6duDey3k3gN0wfTUI7lcD0arG');

select * from react_user order by reg_date desc;

create Table filename_tbl (
	bid varchar(100) NOT NULL,
    filename varchar(200) NOT NULL
)engine=innodb default character set = utf8;

select * from react.filename_tbl;

alter table userboard Modify bid int not null auto_increment primary Key;

select * from userBoard order by bid desc;

select * from filename_tbl order by bid;

create table user_comment (
cno int not null primary key,
content varchar(1000) not null,
username varchar(100) not null, 
reg_date Date,
bid int not null
) engine=innodb default character set = utf8;
alter table user_comment Modify cno int not null auto_increment;

select * from user_comment;

insert into react.user_comment(content,username,reg_Date,bid)
values('aaa','123',now(),1);


update userBoard set reg_date = now() where reg_date is null;

select * from userBoard;
