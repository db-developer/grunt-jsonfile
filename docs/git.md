
git remote add github https://github.com/db-developer/grunt-jsonfile.git
git remote add backup //.../git/@db-developer.grunt-jsonfile.git

.git/config add the following (3) lines:
[remote "origin"]
  url = https://github.com/db-developer/grunt-jsonfile.git
  url = //.../git/@db-developer.grunt-jsonfile.git

You can then push to both repositories by issuing:

<code>git push origin master</code>

Or to a single one by issuing either of these commands:

<code>git push github master</code>  
<code>git push backup master</code>
