import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // Light gray background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA', // Light gray border
  },
  backButton: {
    marginRight: 8,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  dateSeparator: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E5E5EA',
    borderRadius: 16,
    marginVertical: 16,
  },
  dateText: {
    fontSize: 13,
    color: '#5E5E5E',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFCC00', // Example color, adjust as needed
  },
  messageText: {
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
});

export default styles;