::表示在此语句后所有运行的命令都不显示命令行本身
@echo off 
echo ??
::进入d盘

cd C:\tool\mongodb-win32-x86_64-v3.4-latest\mongodb-win32-x86_64-3.4.15-35-gae53ff0702\bin
mongod --dbpath "C:\tool\mongodb-win32-x86_64-v3.4-latest\mongodb-win32-x86_64-3.4.15-35-gae53ff0702\data"

::set path=C:\tool\mongodb-win32-x86_64-v3.4-latest\mongodb-win32-x86_64-3.4.15-35-gae53ff0702\bin
::set data=C:\tool\mongodb-win32-x86_64-v3.4-latest\mongodb-win32-x86_64-3.4.15-35-gae53ff0702\bin\data
::set log=C:\tool\mongodb-win32-x86_64-v3.4-latest\mongodb-win32-x86_64-3.4.15-35-gae53ff0702\bin\log
::cd %path%
::mongod --dbpath %data%


//以下是注释部分
::mongod  -- dbpath  "D:\Program Files\MongoDB\data"

:: d:> echo "this d"
:: d:> echo "this d"
:: d:> echo "this d"
:: d:> echo "this d"
::mongod  --dbpath  "D:\Program Files\MongoDB\data"
::写入b.txt文件

::dir D:\Program Files\MongoDB\bin>  b.txt

::pause