import React, { useState, useEffect } from 'react';
import './style.css';

function ChatBot() {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    const storedQuestionNumber = localStorage.getItem('questionNumber');
    if (storedQuestionNumber !== null) {
      setQuestionNumber(parseInt(storedQuestionNumber));
    }
  }, []);

  const sendMessage = () => {
    const inputField = document.querySelector("input[type='text']");
    const message = inputField.value;
      const chatBoxFooter = document.querySelector(".chat-box-footer");
      chatBoxFooter.style.display = "none";

    if (!isWaitingForResponse) {
      displayUserMessage(message);
      fetchMessageFromServer(message);
    }
    setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1);
  };

  const fetchMessageFromServer = (message) => {
    setIsWaitingForResponse(true);
    console.log(questionNumber);
    fetch('http://localhost:3001/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message, quesno: questionNumber })
    })
      .then(response => response.json())
      .then(data => {
        displayAIMessage(data.message, data.options);
        setIsWaitingForResponse(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsWaitingForResponse(false);
      });
  };

  const displayUserMessage = (message) => {
    const chatBoxBody = document.querySelector(".chat-box-body");
    chatBoxBody.innerHTML += `<div class="message"><span>${message}</span></div>`;
    scrollToBottom();
  };

  const displayAIMessage = (message, options) => {
    const chatBoxBody = document.querySelector(".chat-box-body");
    let messageHTML = `<div class="response"><p>${message}</p>`;

    if (options && options.length > 0) {
      const existingForm = document.querySelector('.optionsForm');
      if (existingForm) {
        existingForm.parentNode.removeChild(existingForm);
      }

      messageHTML += "<form class='form optionsForm'>";
      options.forEach(option => {
        if (option !== '') {
          messageHTML += `<label class="form__radio-label">
          <input type="radio" name="option" class="form__radio-input" value="${option}">
          <span class="form__radio-button"></span>
          ${option}
        </label><br>`;
        }
      });
      messageHTML += `<input type="text" name="text" placeholder="if other is selected..."><br>`;
      messageHTML += "<button type='submit'>Submit</button></form>";
    }

    messageHTML += "</div>";
    chatBoxBody.innerHTML += messageHTML;

    const optionsForm = document.querySelector('.optionsForm');
    optionsForm.addEventListener('submit', function (event) {
      event.preventDefault();
      let selectedOption = optionsForm.querySelector('input[name="option"]:checked').value;
      if (selectedOption.indexOf('Other') === -1) {
        send(selectedOption);
      } else {
        selectedOption = optionsForm.querySelector('input[name="text"]').value;
        send(selectedOption);
      }
    });

    scrollToBottom();
  };

  const send = (selectedOption) => {
    if (!isWaitingForResponse) {
      displayUserMessage(selectedOption);
      sendOptionToBackend(selectedOption);
    }
  };

  const sendOptionToBackend = (selectedOption) => {
    setIsWaitingForResponse(true);
    fetch('http://localhost:3001/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: selectedOption, quesno: questionNumber })
    })
      .then(response => response.json())
      .then(data => {
        if (questionNumber < 10) {
          displayAIMessage(data.message, data.options);
          setIsWaitingForResponse(false);
        } else {
          displayAIMessage("Final Diagnosis: " + data.message);
          setIsWaitingForResponse(false);
          setQuestionNumber(0);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIsWaitingForResponse(false);
      });
  };

  const scrollToBottom = () => {
    const chatBoxBody = document.querySelector(".chat-box-body");
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    localStorage.setItem('questionNumber', questionNumber);
  }, [questionNumber]);

  return (
    <div className="chat-box">
      <div className="chat-box-header">MedConnect</div>
      <div className="chat-box-body">
        <div className="response">
          <span>Hello there, how can I help you today?</span>
        </div>
      </div>
      <div className="chat-box-footer">
        <input
          type="text"
          className="input-box"
          placeholder="Type Hi to Start..."
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
