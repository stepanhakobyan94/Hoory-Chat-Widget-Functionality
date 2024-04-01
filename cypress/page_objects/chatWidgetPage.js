class ChatWidgetPage {
  widgetIcon() {
    return cy.get("button[title='Open chat window']");
  }

  startConversationButton() {
    return cy.get("div button").contains("Start Conversation");
  }

  startConversationButtonInChat() {
    return cy.get("iframe").then(($iframe) => {
      const doc = $iframe.contents();
      return cy.wrap(doc.find("button")).eq(2);
    });
  }

  messageInput() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("textarea#chat-input");
    });
  }

  sendButton() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find(
        "button.icon-button.flex.items-center.justify-center.ml-1"
      );
    });
  }

  firstConversationsFromList() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");

      cy.wrap($body).find("span:contains('Pending')").eq(0);
    });
  }

  secondConversationsFromList() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");

      cy.wrap($body).find("span:contains('Pending')").eq(1);
    });
  }

  backButton() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("button#back-button");
    });
  }

  greetingMessage() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("div.chat-bubble.agent.bg-white");
    });
  }

  userMessage() {
    return cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).find("div.message-wrap.animated-msg.animate");
    });
  }

  chatWidget() {
    return cy.get("#chatwoot_live_chat_widget");
  }
}

export default ChatWidgetPage;
