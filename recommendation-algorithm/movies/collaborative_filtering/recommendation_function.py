import numpy as np
import math
from numpy.linalg import inv
from firebase import firebase

def classifyLevel(rating):
    if rating >= 4.0:
        return 'A'
    elif rating >= 3.0:
        return 'B'
    else:
        return 'C'

def assoc_recommendList(userId,firebase):
    ans = set([])
    result = firebase.get('/user_rating/'+userId,None)
    for movieId in result.keys():
        rating = ''
        for key in result[movieId].keys():
            rating = result[movieId][key]

        ratingLevel = classifyLevel(float(rating))
        assocKey = movieId+'-'+ratingLevel

        #print assocKey
        resultMovies = firebase.get('/association/'+assocKey,None)
        if resultMovies != None:
            movieList = []
            for key in resultMovies.keys():
                movieList = resultMovies[key].split(',')
            for movie in movieList:
                ans.add(movie)

    return ans

def location_recommendList(userId,firebase):
    # should have a user location
    ans = set([])
    dim = 1128
    userResult = firebase.get('/user_location/'+userId,None)
    userLocation = []
    for key in userResult.keys():
        userLocation = userResult[key].split(',')

    allMovies = firebase.get('/movie_location',None)
    movieScores = []
    for movie in allMovies.keys():
        movieLocation = []
        for key in allMovies[movie].keys():
            movieLocation = allMovies[movie][key].split(',')

        e1 = np.array(userLocation).reshape((1,dim))
        e2 = np.array(movieLocation).reshape((dim,1))
        e1 = np.array(e1,dtype=float)
        e2 = np.array(e2,dtype=float)

        movieScores.append([movie,np.dot(e1,e2)])

    #print movieScores[0][1][0][0]
    # sort
    sortedMovieScores = sorted(movieScores,key=lambda x:x[1][0][0],reverse=True)
    for i in range(30):
        ans.add(sortedMovieScores[i][0])

    return ans

def otheruser_recommendList(userId,firebase):
    # should have a user location
    ans = set([])
    dim = 1128
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
        movieScores = firebase.get('/user_rating/'+user,None)
        if movieScores != None:
            for movie in movieScores.keys():
                rate = ''
                for key in movieScores[movie].keys():
                    rate = movieScores[movie][key]
                if float(rate) >= 3.99:
                    ans.add(movie)

    return ans

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)
#recommendMovies = assoc_recommendList('1',firebase)
#recommendMovies = location_recommendList('1',firebase)
#recommendList = otheruser_recommendList('1',firebase)
