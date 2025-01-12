import cv2
from deepface import DeepFace

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Start capturing video
cap = cv2.VideoCapture(0)

# Initialize a dictionary to count emotions
emotion_counts = { "happy": 0, "sad": 0, "angry": 0, "fear": 0, "surprise": 0, "disgust": 0, "neutral": 0 }

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert frame to grayscale and then RGB
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Extract the face ROI
        face_roi = rgb_frame[y:y + h, x:x + w]

        # Perform emotion analysis on the face ROI
        result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)

        # Get the dominant emotion
        emotion = result[0]['dominant_emotion']

        # Increment the emotion count
        emotion_counts[emotion] += 1

        # Draw rectangle around face and label with predicted emotion
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    # Display the resulting frame
    cv2.imshow('Real-time Emotion Detection', frame)

    # Print the counts periodically
    print("Emotion Counts:", emotion_counts)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close all windows
cap.release()
cv2.destroyAllWindows()

# Optional: Save the counts to a file
with open("emotion_counts.txt", "w") as f:
    for emotion, count in emotion_counts.items():
        f.write(f"{emotion}: {count}\n")
