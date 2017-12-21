from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)

result = firebase.get('/daily_user_rating','D')

fw = open('new-ratings','w')
for key in result.keys():
    fw.write('D')
    fw.write(',')
    fw.write(key)
    fw.write(',')
    fw.write(str(result[key]['rating']))
    fw.write('\n')
    #print key,result[key]['rating']

fw.close()
