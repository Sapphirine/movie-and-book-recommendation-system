def user_rate_record():
    # generate all users' rating record
    user_rate = {} # userID -> all rating books
    user_set = []
    f = open('book-ratings')
    for line in f.readlines():
        infos = line.split(';')
        user_set.append(infos[0])
    user_set = set(user_set)
    for ele in user_set:
        user_rate[ele] = []
    f.close()

    f = open('book-ratings')
    for line in f.readlines():
        infos = line.split(';')
        user_rate[infos[0]].append([infos[1],infos[2][:-1]])
    f.close()

    fw = open('ratings-assoc','w')
    for key in user_rate.keys():
        fw.write(key)
        fw.write(';')
        books = ''
        ratings = ''
        for ele in user_rate[key]:
            books += ele[0]
            books += ','
            ratings += ele[1]
            ratings += ','
        fw.write(books[:-1])
        fw.write(';')
        fw.write(ratings[:-1])
        fw.write(';')
        fw.write('\n')
    fw.close()

#user_rate_record()

fw1 = open('ratings1-assoc','w')
fw2 = open('ratings2-assoc','w')
fw3 = open('ratings3-assoc','w')
f = open('ratings-assoc')

cnt = 0
for line in f.readlines():
    if cnt < 35000:
        fw1.write(line)
    elif cnt < 35000*2:
        fw2.write(line)
    else:
        fw3.write(line)
    cnt += 1
f.close()
fw1.close()
fw2.close()
fw3.close()
