from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)
'''
print 'upload user locations'
cnt = 1
f = open('updated_user_locations')
for line in f.readlines():
    print cnt
    cnt += 1
    infos = line.split(',')
    userId = infos[0]
    #print userId
    scores = ','.join(x.strip().replace('[','').replace(']','') for x in infos[1:])
    if firebase.get('/user_location/'+userId,None) != None:
        firebase.delete('/user_location',userId)
    firebase.post('/user_location/'+userId,scores)
f.close()
'''

print 'upload book locations'
cnt = 1
f = open('updated_book_locations')
for line in f.readlines():
    print cnt
    cnt += 1
    infos = line.split(',')
    bookId = infos[0]
    #print bookId
    scores = ','.join(x.strip().replace('[','').replace(']','') for x in infos[1:])
    if firebase.get('/books_location/'+bookId,None) != None:
        firebase.delete('/books_location',bookId)
    firebase.post('/books_location/'+bookId,scores)
f.close()
