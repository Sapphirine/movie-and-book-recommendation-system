from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)
'''
symbols = ['~','`','!','@','#','$','%','^','&','*','(',')','-','_','+','=','{','}','[',']',';',':','>',
'<','?',',','|','/','.',' ','\"']

f = open('average')
bookList = []
for line in f.readlines():
    infos = line.split(',')
    bookId = infos[0].strip()
    exist = False
    for s in symbols:
        if s in bookId:
            exist = True
            break
    if exist == False:
        print bookId
        rating = infos[1][:-1]
        bookList.append([bookId,float(rating)])
f.close()

sortedList = sorted(bookList,key=lambda x:x[1],reverse=True)


fw = open('sort-average','w')
for e in sortedList:
    fw.write(e[0])
    fw.write(',')
    fw.write(str(e[1]))
    fw.write('\n')
fw.close()
'''

listForNew = set([])

upper = 100
cnt = 0
num = 1
f = open('sort-average')
for line in f.readlines():
    bookId = line.split(',')[0]
    print num,bookId
    num += 1
    if firebase.get('/books_location/'+bookId,None) != None:
        listForNew.add(bookId)
        cnt += 1
        print cnt
    if cnt >= upper:
        break
f.close()

#print listForNew

initList = ','.join(str(x).strip() for x in listForNew)
firebase.post('/list_for_new',initList)
