import numpy as np
from numpy.linalg import inv
from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)
'''
users = []
f = open('rated-users')
for line in f.readlines():
    users.append(line[:-1])
f.close()

fw = open('ratings','w')
for user in users:
    movieRating = firebase.get('/user_rating/'+user,None)
    for movieId in movieRating.keys():
        for key in movieRating[movieId].keys():
            rating = movieRating[movieId][key]
            fw.write(user)
            fw.write(',')
            fw.write(movieId)
            fw.write(',')
            fw.write(rating)
            fw.write('\n')
fw.close()
'''

dim = 1128
lam = 0.5
sigma = 0.5
users = set([])
movies = set([])
f = open('new-ratings')
for line in f.readlines():
    infos = line.split(',')
    userId = infos[0]
    movieId = infos[1]
    users.add(userId)
    movies.add(movieId)
f.close()

userRecord = {} # userId --> his all rating record
movieRecord = {} # movieId --> all users who give it a rate
for user in users:
    userRecord[user] = []
for movie in movies:
    movieRecord[movie] = []

f = open('new-ratings')
for line in f.readlines():
    infos = line.split(',')
    userId = infos[0]
    movieId = infos[1]
    rating = infos[2]

    movieRatings = userRecord[userId]
    movieRatings.append([movieId,rating])
    userRecord[userId] = movieRatings

    userRatings = movieRecord[movieId]
    userRatings.append([userId,rating])
    movieRecord[movieId] = userRatings
f.close()

userLocations = {}
movieLocations = {}

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
        print 'no location found, generate a new one'

for movie in movies:
    result = firebase.get('/movie_location/'+movie,None)
    tmp = ''
    for key in result.keys():
        tmp = result[key]
    scores = []
    for t in tmp.split(','):
        scores.append(float(t))
    movieLocations[movie] = np.array(scores).reshape((dim,1))

print 'initialize done'

# collaborative iteration
IterationTime = 3
t = 0
while t < IterationTime:
    # update user locations
    for user in users:
        matrix = np.identity(dim,dtype=float)
        matrix = map(lambda x: x*lam*sigma*sigma,matrix)
        array = np.zeros(dim).reshape((dim,1))
        for movieInfo in userRecord[user]:
            movieId = movieInfo[0]
            rating = float(movieInfo[1])

            vector = movieLocations[movieId]
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

    # update movie location
    for movie in movies:
        matrix = np.identity(dim,dtype=float)
        matrix = map(lambda x: x*lam*sigma*sigma,matrix)
        array = np.zeros(dim).reshape((dim,1))
        for userInfo in movieRecord[movie]:
            userId = userInfo[0]
            rating = float(userInfo[1])

            vector = userLocations[userId]
            #vector = np.array(vector,dtype=float)
            #matrix += np.dot(vector.transpose(),vector)
            matrix = np.add(matrix,np.dot(vector,vector.transpose()))

            vector = map(lambda x: x*rating,vector)
            #array += vector
            array = np.add(array,vector)

        try:
            update = np.dot(inv(matrix),array)
            movieLocations[movie] = update.reshape((dim,1))
        except:
            print 'Iteration',t+1,'updating movie locations, singular matrix',movie

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
