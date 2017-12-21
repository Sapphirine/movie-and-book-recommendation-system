from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)


'''
f = open('book-ratings')
fw = open('sample-ratings','w')
cnt = 1
for line in f.readlines():
    fw.write(line)
    cnt += 1
    if cnt > 5000:
        break
f.close()
fw.close()
'''


fileNames = ['sample-ratings']
users = set([])
for name in fileNames:
    cnt = 1
    f = open(name)
    for line in f.readlines():
        print cnt
        cnt += 1
        infos = line.split(',')
        userId = infos[0]
        bookId = infos[1]
        rating = infos[2]
        firebase.post('/user_rating/'+userId+'/'+bookId,rating)
        users.add(userId)
    f.close()

f = open('rated-users','w')
for user in users:
    f.write(user)
    f.write('\n')
f.close()
