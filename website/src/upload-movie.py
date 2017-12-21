from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)

#firebase.post('/book_list_for_new',{'user':'data'})
'''
books = set([])
result = firebase.get('/list_for_new',None)
for key in result:
    bookList = result[key].split(',')
    for book in bookList:
        books.add(book)

f = open('BX-Books.csv')
fw = open('book-infos','w')
cnt = 0
for line in f.readlines():
    infos = line.split(';')
    bookId = infos[0].replace('\"','').replace('\"','')
    if bookId in books:
        title = infos[1].replace('\"','').replace('\"','')
        author = infos[2].replace('\"','').replace('\"','')
        year = infos[3].replace('\"','').replace('\"','')
        publisher = infos[4].replace('\"','').replace('\"','')
        imageUrl = infos[7].replace('\"','').replace('\"','')
        write = bookId+';'+title+';'+author+';'+year+';'+publisher+';'+imageUrl
        fw.write(write)
        cnt += 1
        print cnt
    if cnt >= 100:
        break
f.close()
fw.close()
'''

'''
f = open('book-infos')
cnt = 1
for line in f.readlines():
    infos = line.split(';')
    bookId = infos[0]
    firebase.post('/book_infos/'+bookId,{
        'title':infos[1],
        'author':infos[2],
        'year':infos[3],
        'publisher': infos[4]
    })
    print cnt
    cnt += 1
f.close()
'''
'''
f = open('book-infos')
fw = open('book-image','w')
for line in f.readlines():
    infos = line.split(';')
    bookId = infos[0]
    url = infos[-1]
    fw.write(bookId)
    fw.write(';')
    fw.write(str(url))
f.close()
fw.close()
'''
'''
fw = open('recommend','w')
result = firebase.get('/user_recommendation/1189',None)
for key in result:
    bookList = result[key].split(',')
    books = ''
    for book in bookList:
        books += book+','
    fw.write(books[:-1])
fw.close
#print result
'''

f = open('recommend')
for line in f.readlines():
    firebase.post('/book_user_recommendation/1189',line)
f.close()
