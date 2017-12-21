from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)

f = open('merged_association')
for line in f.readlines():
    infos = line.split('==>')
    lhs = infos[0]
    rhs = infos[1]
    firebase.post('/association/'+lhs,rhs[:-1])
f.close()
