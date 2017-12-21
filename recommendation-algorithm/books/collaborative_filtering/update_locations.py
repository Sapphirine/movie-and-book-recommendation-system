import numpy as np
from numpy.linalg import inv
from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)
'''
users = []
f = open('rated-users')
for line in f.readlines():
    users.append(line[:-1])
f.close()

fw = open('ratings','w')
for user in users:
    bookRating = firebase.get('/user_rating/'+user,None)
    for bookId in bookRating.keys():
        for key in bookRating[bookId].keys():
            rating = bookRating[bookId][key]
            fw.write(user)
            fw.write(',')
            fw.write(bookId)
            fw.write(',')
            fw.write(rating)
            fw.write('\n')
fw.close()
'''

dim = 15
lam = 0.3
sigma = 0.1
users = set([])
books = set([])
f = open('sample-ratings')
for line in f.readlines():
    infos = line.split(',')
    userId = infos[0]
    bookId = infos[1]
    users.add(userId)
    books.add(bookId)
f.close()

userRecord = {} # userId --> his all rating record
bookRecord = {} # bookId --> all users who give it a rate
for user in users:
    userRecord[user] = []
for book in books:
    bookRecord[book] = []

f = open('sample-ratings')
for line in f.readlines():
    infos = line.split(',')
    userId = infos[0]
    bookId = infos[1]
    rating = infos[2]

    bookRatings = userRecord[userId]
    bookRatings.append([bookId,rating])
    userRecord[userId] = bookRatings

    userRatings = bookRecord[bookId]
    userRatings.append([userId,rating])
    bookRecord[bookId] = userRatings
f.close()

userLocations = {}
bookLocations = {}

for user in users:
    #userLocations[user] = np.random.normal(loc=lam,scale=sigma,size=(dim,1))
    #userLocations[user] = np.random.random(size=(dim,1))
    result = firebase.get('/user_location/'+user,None)
    if result != None:
        tmp = ''
        for key in result.keys():
            tmp = result[key]
        scores = []
        for t in tmp.split(','):
            scores.append(float(t))
        userLocations[user] = np.array(scores).reshape((dim,1))
    else:
        userLocations[user] = np.random.random(size=(dim,1))
        print 'no user location found, generate a new one'

for book in books:
    '''
    result = firebase.get('/books_location/'+book,None)
    if result != None:
        tmp = ''
        for key in result.keys():
            tmp = result[key]
            scores = []
            for t in tmp.split(','):
                scores.append(float(t))
            bookLocations[book] = np.array(scores).reshape((dim,1))
    else:
        bookLocations[book] = np.random.random(size=(dim,1))
        print 'no book locations found, generate a new one'
    '''
    bookLocations[book] = np.random.random(size=(dim,1))

print 'initialize done'

# collaborative iteration
IterationTime = 2
t = 0
while t < IterationTime:
    # update user locations
    print 'iteration', t+1
    for user in users:
        matrix = np.identity(dim,dtype=float)
        matrix = map(lambda x: x*lam*sigma*sigma,matrix)
        array = np.zeros(dim).reshape((dim,1))
        for bookInfo in userRecord[user]:
            bookId = bookInfo[0]
            rating = float(bookInfo[1])
            if rating < 1.0:
                rating = 1.0

            vector = bookLocations[bookId]
            #vector = np.array(vector,dtype=float)
            #matrix += np.dot(vector,vector.transpose())
            matrix = np.add(matrix,np.dot(vector,vector.transpose()))
            #print matrix

            vector = map(lambda x: x*rating,vector)
            #array += vector
            array = np.add(array,vector)

        try:
            update = np.dot(inv(matrix),array)
            userLocations[user] = update.reshape((dim,1))
        except:
            print 'Iteration',t+1,'updating user locations, singular matrix',user

    # update book location
    for book in books:
        matrix = np.identity(dim,dtype=float)
        matrix = map(lambda x: x*lam*sigma*sigma,matrix)
        array = np.zeros(dim).reshape((dim,1))
        for userInfo in bookRecord[book]:
            userId = userInfo[0]
            rating = float(userInfo[1])

            if rating < 1.0:
                rating = 1.0

            vector = userLocations[userId]
            #vector = np.array(vector,dtype=float)
            #matrix += np.dot(vector.transpose(),vector)
            matrix = np.add(matrix,np.dot(vector,vector.transpose()))

            vector = map(lambda x: x*rating,vector)
            #array += vector
            array = np.add(array,vector)

        try:
            update = np.dot(inv(matrix),array)
            bookLocations[book] = update.reshape((dim,1))
        except:
            print 'Iteration',t+1,'updating book locations, singular matrix',book

    t += 1

fw = open('updated_user_locations','w')
for user in users:
    #print user, userLocations[user]
    fw.write(user)
    fw.write(',')
    scores = ''
    for e in userLocations[user]:
        scores += str(e)+','
    fw.write(scores[:-1])
    fw.write('\n')
fw.close()

fw = open('updated_book_locations','w')
for book in books:
    #print user, userLocations[user]
    fw.write(book)
    fw.write(',')
    scores = ''
    for e in bookLocations[book]:
        scores += str(e)+','
    fw.write(scores[:-1])
    fw.write('\n')
fw.close()
