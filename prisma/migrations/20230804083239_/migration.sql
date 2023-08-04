-- CreateTable
CREATE TABLE "user" (
    "userId" TEXT NOT NULL,
    "userPw" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "post" (
    "postId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("postId")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
