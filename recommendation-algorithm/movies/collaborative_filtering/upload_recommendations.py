from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)


f = open('recommend_list')
for line in f.readlines():
    infos = line.split(';')
    userId = infos[0]
    rList = infos[1][:-1]

    if firebase.get('/user_recommendation/'+userId,None) != None:
        firebase.delete('/user_recommendation',userId)
    firebase.post('/user_recommendation/'+userId,rList)
f.close()


'''
result = firebase.get('/user_recommendation/1',None)
print result
'''
