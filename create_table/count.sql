SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP view IF EXISTS `count`;
create view count
as 
select user_id, h_type, count(*) as c from houses
group by user_id, h_type
order by h_type

