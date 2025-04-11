from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, ConversationHandler, CallbackContext
from telegram.ext import filters

# Bosqichlar
LOGIN, PASSWORD = range(2)

# Login va parolni saqlash uchun
user_data = {}

# /start komandasini ishlashga tayyorlash
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Ro'yxatdan o'tish uchun loginni kiriting:")
    return LOGIN

# Loginni tekshirish va parolni so'rash
async def login(update: Update, context: CallbackContext):
    user_data[update.message.chat_id] = {'login': update.message.text}
    await update.message.reply_text("Endi parolni kiriting:")
    return PASSWORD

# Parolni tekshirish
async def password(update: Update, context: CallbackContext):
    if user_data.get(update.message.chat_id) and user_data[update.message.chat_id]['login'] == 'wonderboy' and update.message.text == '1A@111':
        await update.message.reply_text("Ro'yxatdan o'zdingiz!")
    else:
        await update.message.reply_text("Noto'g'ri login yoki parol. Iltimos, qayta urinib ko'ring.")
        return LOGIN
    return ConversationHandler.END

# /cancel komandasini ishlashga tayyorlash
async def cancel(update: Update, context: CallbackContext):
    await update.message.reply_text("Ro'yxatdan o'tish bekor qilindi.")
    return ConversationHandler.END

# Botni ishga tushirish
def main():
    application = Application.builder().token("8018652189:AAG75NNlEzZfVT10DneasL2vHYlL0th-Bs0").build()

    # ConversationHandler yordamida ikki bosqichli tizimni sozlash
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            LOGIN: [MessageHandler(filters.TEXT & ~filters.COMMAND, login)],
            PASSWORD: [MessageHandler(filters.TEXT & ~filters.COMMAND, password)],
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )

    application.add_handler(conv_handler)
    
    application.run_polling()

if __name__ == '__main__':
    main()
