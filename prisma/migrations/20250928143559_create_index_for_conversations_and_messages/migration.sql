-- CreateIndex
CREATE INDEX "conversations_id_idx" ON "public"."conversations"("id");

-- CreateIndex
CREATE INDEX "messages_conversationId_createdAt_idx" ON "public"."messages"("conversationId", "createdAt");
