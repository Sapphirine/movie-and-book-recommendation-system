from firebase import firebase
from recommendation_function import assoc_recommendList, location_recommendList, otheruser_recommendList

firebase = firebase.FirebaseApplication('https://eecs6893-movie-data.firebaseio.com', None)

users = set([])
f = open('new-ratings')
for line in f.readlines():
    users.add(line[0])
f.close()

#users = ['1','2','3','4','5']

recommendLists = []

cnt = 1
for user in users:
    print cnt, user
    orgRecommendList = set([])
    assocList = assoc_recommendList(user,firebase)
    locationList = location_recommendList(user,firebase)
    relevanceList = otheruser_recommendList(user,firebase)

    for e in assocList:
        orgRecommendList.add(e)
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
