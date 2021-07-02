# Getting started
Suite of testing bots for several discord.js versions and applications. Each sub-project should be run on its own token.

Each application requires a file called `.env` in its root directory containing:

```
TOKEN=71pjmILeAvX0CmSRnKBDnOCh50llqGe4Q0tmwBiDwcoi2iO9b30i70iug3f
OWNER=83886770768314368
PREFIX=!
LOCKED=TRUE // remove line if open command usage is desired
```

If multiple owners are desired they can be separated with a comma:
`OWNER=83886770768314368,175179625880616960`

From version 13 on there is an additional key for a dev guild, under which slash commands will be deployed:

```
DEV_GUILD=345341901051920395
```

Each bot has an eval command locked to owners which executes arbitrary code! Giving eval access to __anyone__ is generally a bad idea.

Included Testing images: STRT (loop) by beeple https://www.beeple-crap.com/vjloops (CC)   
*(The files are renamed to `image.png` and `image.gif` to achieve more memorable access via the eval command)*

# Docker

[What is docker?](https://docs.docker.com/get-started/overview/)

The bot cluster is set up with [docker-compose](https://docs.docker.com/compose/). Run 

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
docker-compose up --build dev v12
```
