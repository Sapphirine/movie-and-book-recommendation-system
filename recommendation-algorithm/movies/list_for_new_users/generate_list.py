from firebase import firebase

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)
'''
f = open('average')
movieList = []
for line in f.readlines():
    infos = line.split(',')
    movieId = infos[0]
    rating = infos[1][:-1]
    movieList.append([movieId,float(rating)])
f.close()

sortedList = sorted(movieList,key=lambda x:x[1],reverse=True)

fw = open('sort-average','w')
for e in sortedList:
    fw.write(e[0])
    fw.write(',')
    fw.write(str(e[1]))
    fw.write('\n')
fw.close()
'''

listForNew = set([])

upper = 50
cnt = 0
num = 1
f = open('sort-average')
for line in f.readlines():
    movieId = line.split(',')[0]
    print num,movieId
    num += 1
    if firebase.get('/movie_location/'+movieId,None) != None:
        listForNew.add(movieId)
        cnt += 1
        print cnt
    if cnt >= upper:
        break
f.close()

#print listForNew

f = open('merged_association')
for line in f.readlines():
    infos = line.split('==>')
    movieId = infos[0]
    movieId = movieId.replace('-A','').replace('-B','').replace('-C','')
    listForNew.add(movieId)
f.close()

initList = ','.join(str(x).strip() for x in listForNew)
firebase.post('/list_for_new',initList)
