# Checklist for Mini-API Development Deployment

## Contents
- [Semantic versioning](#Semantic-versioning)
- [Excluded files](#Excluded-files)
- [Updating content](#Updating-content)


## Semantic versioning
- SemVer changes follow [semantic-versioning 2.0.0 guidelines](https://semver.org/) as described on [npm docs `semver` page](https://docs.npmjs.com/cli/v6/using-npm/semver)
- Value for "version" property has been updated in `package.json`
- Breaking changes are noted in commit message


## Excluded files
- `.gitignore` contains the following:

  ```
  # Christopher Fraser (cmfraser1380)
  .DS_Store
  /database/loginInfo.*
  
  # Kristopher Bonefont (krstphrrr)
  **/node_modules/
  **/*.env
  **/*.txt
  ```

## Updating content
- Changes pushed ***only*** to branch CMF-DEV-DEPLOYMENT
- Pull request ***not*** made
