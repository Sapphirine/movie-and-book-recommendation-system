from firebase import firebase
from recommendation_function import assoc_recommendList, location_recommendList, otheruser_recommendList

firebase = firebase.FirebaseApplication('https://eecs6893-book-data.firebaseio.com', None)
'''
users = []
f = open('rated-users')
for line in f.readlines():
    users.append(line[:-1])
f.close()
'''

#users = ['735','1200','278333','278336','278767']
users = ['507','1256','278637','278633','1189']

recommendLists = []

cnt = 1
for user in users:
    print cnt, user
    orgRecommendList = set([])
    #assocList = assoc_recommendList(user,firebase)
    locationList = location_recommendList(user,firebase)
    relevanceList = otheruser_recommendList(user,firebase)

    #for e in assocList:
    #    orgRecommendList.add(e)
    for e in locationList:
        orgRecommendList.add(e)
    for e in relevanceList:
        orgRecommendList.add(e)

    # filter those which user already rated.
    recommendList = set([])
    for e in orgRecommendList:
        if firebase.get('/user_rating/'+user+'/'+e,None) == None:
            recommendList.add(e)

    recommendLists.append([user,recommendList])
    cnt += 1

fw = open('recommend_list','w')
for l in recommendLists:
    fw.write(l[0])
    fw.write(';')
    rList = ''
    for e in l[1]:
        rList += e
        rList += ','
    rList = rList[:-1]
    fw.write(rList)
    fw.write('\n')
fw.close()
