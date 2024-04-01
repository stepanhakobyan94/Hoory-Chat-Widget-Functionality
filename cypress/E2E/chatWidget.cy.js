import ChatWidgetPage from "../page_objects/chatWidgetPage";
import "cypress-iframe";
const message = "Hello, this is a test message";
const secondMessage = "Hello this is a second test message";

describe("Chat Widget Functionality", function () {
  const chatWidgetPage = new ChatWidgetPage();

  beforeEach(() => {
    cy.visit("https://uat.hoory.ai/hoory").wait(3000);
  });

  it("Clicking on the widget icon must open the widget", () => {
    chatWidgetPage.widgetIcon().click({ force: true });
    chatWidgetPage.chatWidget().should("be.visible");
  });

  it('"Start Conversation" button and chat functionality', () => {
    chatWidgetPage.startConversationButton().click({ force: true });
    chatWidgetPage.startConversationButtonInChat().click();
    chatWidgetPage
      .greetingMessage()
      .should("contain.text", "Hi, how can I help you?");
    chatWidgetPage.messageInput().type(message).wait(2000);
    chatWidgetPage.sendButton().click();
    chatWidgetPage.userMessage().should("contain.text", message);
    chatWidgetPage.backButton().click();

    chatWidgetPage.firstConversationsFromList().should("exist");
    chatWidgetPage.startConversationButtonInChat().click();
    chatWidgetPage.messageInput().type(secondMessage).wait(2000);
    chatWidgetPage.sendButton().click();
    chatWidgetPage.userMessage().should("contain.text", secondMessage);
    chatWidgetPage.backButton().click();
    chatWidgetPage.firstConversationsFromList().should("exist");
    chatWidgetPage.secondConversationsFromList().should("exist");
  });
});
