package ai_document_qa.project.dto;

public class ChatResponse {

    private String answer;
    private int startTime;
    private int endTime;

    // ✅ DEFAULT CONSTRUCTOR
    public ChatResponse() {}

    // ✅ OLD CONSTRUCTOR (optional keep)
    public ChatResponse(String answer) {
        this.answer = answer;
    }

    // ✅ NEW REQUIRED CONSTRUCTOR (FIX)
    public ChatResponse(String answer, int startTime, int endTime) {
        this.answer = answer;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // GETTERS & SETTERS
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getStartTime() {
        return startTime;
    }

    public void setStartTime(int startTime) {
        this.startTime = startTime;
    }

    public int getEndTime() {
        return endTime;
    }

    public void setEndTime(int endTime) {
        this.endTime = endTime;
    }
}