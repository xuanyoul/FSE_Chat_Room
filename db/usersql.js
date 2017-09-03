var userSQL =
{
		insert: 'INSERT INTO userinfo(username, password) VALUES(?, ?)',
		queryAll: 'SELECT * FROM userinfo',
		getPswByName: 'SELECT * FROM userinfo where username=?',
		insertmsg: 'INSERT INTO usermsg VALUES(?, ?, ?)',
		querymsg: 'SELECT *, DATE_FORMAT(sendtime, \'%Y-%m-%d %H:%i:%S\') as realtime FROM usermsg',
};
module.exports = userSQL;