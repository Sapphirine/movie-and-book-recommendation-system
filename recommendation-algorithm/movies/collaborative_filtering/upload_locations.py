from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)

f = open('updated_user_locations')
for line in f.readlines():
    infos = line.split(',')
    userId = infos[0]
    #print userId
    scores = ','.join(x.strip().replace('[','').replace(']','') for x in infos[1:])
    if firebase.get('/user_location/'+userId,None) != None:
        firebase.delete('/user_location',userId)
    firebase.post('/user_location/'+userId,scores)
f.close()
