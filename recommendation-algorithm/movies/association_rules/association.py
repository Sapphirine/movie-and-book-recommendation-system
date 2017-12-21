
def generateAssociation(index):
    min_supp = 0.05
    min_conf = 0.3

    userRateRecord = {} # user --> all his rated movies (with level)
    movieRateRecord = {} # movie with rate level --> all users who rate it
    qualifiedSupports = []
    supportCount = {}
    freq_results = []
    itemNumber = 2
    N = 0
    fileName = 'ratings'+index+'-assoc'
    f = open(fileName)
    for line in f.readlines():
        N += 1
        infos = line.split(';')
        userId = infos[0]
        movies = infos[1].split(',')
        rates = infos[2].split(',')
        record = []
        for movie,rate in zip(movies,rates):
            record.append(movie+'-'+rate)
            movieRateRecord[movie+'-'+rate] = []
        userRateRecord[userId] = record

    f.close()

    # initialize L-1 itemset
    for user in userRateRecord.keys():
        for e in userRateRecord[user]:
            movieRateRecord[e].append(user)

    tmp = movieRateRecord
    movieRateRecord = {}
    L = []
    for movieRate in tmp.keys():
        supportCount[movieRate] = len(tmp[movieRate])
        if float(len(tmp[movieRate])) / float(N) >= min_supp:
            L.append([movieRate])
            movieRateRecord[movieRate] = tmp[movieRate]

    #print len(L)
    print 'initialize done, perform A priori method'

    while len(L) > 0:
        print 'iter',itemNumber-1, 'finding qualified support with',itemNumber,'items'
        # step1 generate k-item candidates based on L(k-1)
        firstCandidates = []
        i = 0
        for e1 in L:
            j = 0
            for e2 in L:
                if i < j:
                    newCandidate = []
                    for e in e1:
                        newCandidate.append(e)
                    for e in e2:
                        newCandidate.append(e)
                    newCandidate = set(newCandidate)
                    if len(newCandidate) == len(e1) + 1:
                        newCandidate = list(newCandidate)
                        firstCandidates.append(newCandidate)
                j += 1
            i += 1
        print 'first candidates number:',len(firstCandidates)

        # step2 check if all of each generated k-item candidate's subset is included in L(k-1),
        # if not, abandon this k-item candidate
        secondCandidates = []
        for candidate in firstCandidates:
            exist = True
            for ind in range(len(candidate)):
                subset = candidate[0:ind] + candidate[ind+1:]
                if subset not in L:
                    exist = False
                    break
            if exist == True:
                secondCandidates.append(candidate)
        print 'second candidates number:',len(secondCandidates)
        # filter remained candidates with the condition: support(candidate) >= min_supp
        nextMovieRateRecord = {}
        qualifiedCandidates = []
        for candidate in secondCandidates:
            key = ''
            for e in candidate[:-1]:
                key += e+','
            key = key[:-1]
            usersOfThisMovie = movieRateRecord[key]
            nextMovieRateRecord[key+','+candidate[-1]] = []
            for user in usersOfThisMovie:
                if set(candidate).issubset(set(userRateRecord[user])):
                    nextMovieRateRecord[key+','+candidate[-1]].append(user)

            key = ''
            for e in candidate:
                key += e + ','
            key = key[:-1]
            supportCount[key] = len(nextMovieRateRecord[key])

        movieRateRecord = {}
        for e in nextMovieRateRecord.keys():
            frequency = float(len(nextMovieRateRecord[e])) / float(N)
            if frequency >= min_supp:
                movieRateRecord[e] = nextMovieRateRecord[e]
                candidate = e.split(',')
                qualifiedCandidates.append(candidate)
                result = [candidate,frequency]
                freq_results.append(result)

        print 'qualified candidates number:',len(qualifiedCandidates),',with',itemNumber,'items'
        if len(qualifiedCandidates) > 0:
            itemNumber += 1
            qualifiedSupports.extend(qualifiedCandidates)
        L = qualifiedCandidates

    #print 'all qualified supports'
    #print len(qualifiedSupports)
    #for result in freq_results:
    #    print result[0],'==>', result[1]

    # deduce association
    # number of lhs = 1
    conf_results = []
    print 'deducing association rules'
    for support in qualifiedSupports:
        for i in range(len(support)):
            allKey = ''
            for e in support:
                allKey += str(e)+','
            allKey = allKey[:-1]

            leftKey = support[i]

            confidence = float(supportCount[allKey]) / float(supportCount[leftKey])
            if confidence >= min_conf:
                rhs = ''
                for e in support:
                    if e != leftKey:
                        rhs += e+','
                rhs = rhs[:-1]
                result = [leftKey,rhs,confidence]
                conf_results.append(result)

    writeFileName = 'association'+index
    fw = open(writeFileName,'w')
    for result in conf_results:
        fw.write(result[0])
        fw.write('==>')
        fw.write(result[1])
        fw.write(';')
        fw.write(str(result[2]))
        fw.write('\n')
    fw.close()

ind = ['1','2','3','4','5','6','7','8','9','10']
for i in ind:
    print 'dealing with',i
    generateAssociation(i)
