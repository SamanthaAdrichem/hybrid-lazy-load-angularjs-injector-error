BRANCH="development"
if [ "${BITBUCKET_PR_DESTINATION_BRANCH}" ]; then BRANCH=${BITBUCKET_PR_DESTINATION_BRANCH}; fi
if [ "${1}" ]; then BRANCH=${1}; fi
echo ${BRANCH}
FILES=`git diff --cached --name-only origin/${BRANCH} | grep -E '\.(ts)$' | xargs printf -- '--files=%s\n'`
echo "Scanning: "
for file in ${FILES}; do echo ${file}; done;
if [ "${FILES}" ] && [ "${FILES}" != "--files=" ]; then ./node_modules/@angular/cli/bin/ng lint -- --tsConfig=tsconfig.json ${FILES}; fi
