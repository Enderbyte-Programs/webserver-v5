import email.mime
import email.mime.message
import email.mime.multipart
import email.mime.text
import smtplib
import tomllib
import email
import sys
args = sys.argv[1:]

#Args Scheme: toaddress subject message

TOADDRESS = args[0]
MSGSUB = args[1]
MSGDATA = args[2].replace("#DQ",'"').replace("#SQ","'")

port = 587  # For SSL
address = "hbd.noreply@gmail.com"
with open("mailpass.toml","rb") as f:
    password = tomllib.load(f)["password"]
# Create a secure SSL context

message = email.mime.multipart.MIMEMultipart()
message["Subject"] = MSGSUB
message["From"] = f"Handsworth Bottle Drive Email Service <handsworthbottledrive@gmail.com>"
message["To"] = TOADDRESS
message["Sender"] = address
message["Reply-To"] = "handsworthbottledrive@gmail.com"
message.attach(email.mime.text.MIMEText(MSGDATA,"html"))
print(password)
with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
    server.login("hbd.noreply@gmail.com", password)
    server.sendmail(address,TOADDRESS,message.as_string())
    print("Successfully sent mail",message.as_string())