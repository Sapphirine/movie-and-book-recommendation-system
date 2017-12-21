from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)

f = open('recommend_list')
for line in f.readlines():
    infos = line.split(';')
    userId = infos[0]
    rList = infos[1]

    if firebase.get('/user_recommendation/'+userId,None) != None:
        firebase.delete('/user_recommendation',userId)
    firebase.post('/user_recommendation/'+userId,rList)
f.close()
