
index = ['1','2','3','4','5','6','7','8','9','10']
lhsRecord = {}
LHS = set([])

for ind in index:
    fileName = 'association'+ind
    f = open(fileName)
    for line in f.readlines():
        infos = line.split(';')[0].split('==>')
        lhs = infos[0]
        LHS.add(lhs)
    f.close()

for lhs in LHS:
    lhsRecord[lhs] = set([])

for ind in index:
    fileName = 'association'+ind
    f = open(fileName)
    for line in f.readlines():
        infos = line.split(';')[0].split('==>')
        lhs = infos[0]
        rhs = infos[1].split(',')
        for e in rhs:
            if '-A' in e:
                lhsRecord[lhs].add(e.replace('-A',''))
    f.close()

fw = open('merged_association','w')
for lhs in LHS:
    rhs = lhsRecord[lhs]
    fw.write(lhs)
    fw.write('==>')
    right = ''
    for e in rhs:
        right += e+','
    right = right[:-1]
    fw.write(right)
    fw.write("\n")
fw.close()
