import numpy as np
import math
from numpy.linalg import inv
from firebase import firebase

def classifyLevel(rating):
    if rating >= 6.0:
        return 'A'
    elif rating >= 3.0:
        return 'B'
    else:
        return 'C'

def assoc_recommendList(userId,firebase):
    ans = set([])
    result = firebase.get('/user_rating/'+userId,None)
    for bookId in result.keys():
        rating = ''
        for key in result[bookId].keys():
            rating = result[bookId][key]

        ratingLevel = classifyLevel(float(rating))
        assocKey = bookId+'-'+ratingLevel

        #print assocKey
        resultbooks = firebase.get('/association/'+assocKey,None)
        if resultbooks != None:
            bookList = []
            for key in resultbooks.keys():
                bookList = resultbooks[key].split(',')
            for book in bookList:
                ans.add(book)

    return ans

def location_recommendList(userId,firebase):
    # should have a user location
    ans = set([])
    dim = 15
    userResult = firebase.get('/user_location/'+userId,None)
    userLocation = []
    for key in userResult.keys():
        userLocation = userResult[key].split(',')

    allbooks = firebase.get('/books_location',None)
    bookScores = []
    for book in allbooks.keys():
        bookLocation = []
        for key in allbooks[book].keys():
            bookLocation = allbooks[book][key].split(',')

        e1 = np.array(userLocation).reshape((1,dim))
        e2 = np.array(bookLocation).reshape((dim,1))
        e1 = np.array(e1,dtype=float)
        e2 = np.array(e2,dtype=float)

        bookScores.append([book,np.dot(e1,e2)])

    #print bookScores[0][1][0][0]
    # sort
    sortedbookScores = sorted(bookScores,key=lambda x:x[1][0][0],reverse=True)
    for i in range(30):
        ans.add(sortedbookScores[i][0])

    return ans

def otheruser_recommendList(userId,firebase):
    # should have a user location
    ans = set([])
    dim = 15
    userResult = firebase.get('/user_location/'+userId,None)
    userLocation = []
    for key in userResult.keys():
        userLocation = userResult[key].split(',')

    allUsers = firebase.get('/user_location',None)

    userRelevance = []
    for user in allUsers.keys():
        if user != userId:
            otherUserLocation = []
            for key in allUsers[user].keys():
                otherUserLocation = allUsers[user][key].split(',')

            e1 = np.array(userLocation).reshape((1,dim))
            e2 = np.array(otherUserLocation).reshape((dim,1))
            e1 = np.array(e1,dtype=float)
            e2 = np.array(e2,dtype=float)

            l1 = math.sqrt(np.dot(e1,e1.transpose())[0][0])
            l2 = math.sqrt(np.dot(e2,e2.transpose())[0][0])
            userRelevance.append([user,(np.dot(e1,e2)[0][0]) / (l1*l2)])

    sortedUserRelevance = sorted(userRelevance,key=lambda x:x[1],reverse=True)

    relevantUsers = []
    for i in range(20):
        relevantUsers.append(sortedUserRelevance[i][0])

    for user in relevantUsers:
        bookScores = firebase.get('/user_rating/'+user,None)
        if bookScores != None:
            for book in bookScores.keys():
                rate = ''
                for key in bookScores[book].keys():
                    rate = bookScores[book][key]
                if float(rate) >= 5.99:
                    ans.add(book)

    return ans

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)
#recommendbooks = assoc_recommendList('1',firebase)
#recommendbooks = location_recommendList('1',firebase)
#recommendList = otheruser_recommendList('1',firebase)
