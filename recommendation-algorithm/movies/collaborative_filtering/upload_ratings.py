from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)

#fileNames = ['sample-ratings']
fileNames = ['new-ratings']
users = set([])
for name in fileNames:
    f = open(name)
    for line in f.readlines():
        infos = line.split(',')
        userId = infos[0]
        movieId = infos[1]
        rating = infos[2]
        if firebase.get('/user_rating/'+userId+'/'+movieId,None) == None:
            firebase.post('/user_rating/'+userId+'/'+movieId,rating)
        users.add(userId)
    f.close()

'''
f = open('rated-users','w')
for user in users:
    f.write(user)
    f.write('\n')
f.close()
'''
