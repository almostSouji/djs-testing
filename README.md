# Getting started
Suite of testing bots for several discord.js versions and applications. Each sub-project should be run on its own token.

Each bot will set its username based on the running discord.js version to easily discern them. The shard project will set an activity and status to reflect the shard in its presence.

Each application needs a file `.env` in its root directory containing

```
TOKEN=71pjmILeAvX0CmSRnKBDnOCh50llqGe4Q0tmwBiDwcoi2iO9b30i70iug3f
OWNER=83886770768314368
PREFIX=!
```

If multiple owners are desired they can be separated with a comma:
`OWNER=83886770768314368,175179625880616960`

Each bot has an eval command locked to owners which executes arbitrary code! Giving eval access to __anyone__ is generally a bad idea.

Included Testing images: STRT (loop) by beeple https://www.beeple-crap.com/vjloops (CC)   
*(The files are renamed to `image.png` and `image.gif` to achieve more memorable access via the eval command)*

# Docker

The bot cluster is set up with docker-compose. Run 

```
docker-compose up
```

in the root directory to build and run the entire cluster.

```
docker-compose up v11 v12
```

Will only build and start the projects `v11` and `v12`, projects are space-separated.

If you made changes to the source you want to apply to the container pass the `--build` flag. Note that the flag has to come directly after the `up` command.

```
docker-compose up --build
docker-compose up --build v11 v12
```
