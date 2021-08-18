export default class BaseUrls {

    static USERS = "user";
    static PROJECTS = "project";
    static PROJECT = "project/:projectId";
    static USER = "user/:userId";
    static PROJECT_USER = "project/:projectId/user/:userId";

    static IMAGE_FILE = "files/image/:file";

    static AUDIO_PAGE_VIEW = "/case/:caseId/audio-transcription/:audioId/view";

    static AUDIO_TRANSCRIPTION_UPLOAD = "project/:projectId/audio_transcription";
    static AUDIO_TRANSCRIPTION_EXPORT = "project/:projectId/audio_transcription/export";
    static AUDIO_TRANSCRIPTION = "project/:projectId/audio_transcription/:id";
    static AUDIO_TRANSCRIPTION_SEGMENT = "project/:projectId/audio_transcription/:id/segment";
    static AUDIO_TRANSCRIPTION_SEGMENT_EDIT = "project/:projectId/audio_transcription/:audioTranscriptionId/segment/:id";
    static AUDIO_TRANSCRIPTION_SEGMENT_REVISION_CREATE = "project/:projectId/audio_transcription/:audioTranscriptionId/segment/:segmentId/revision";
    static AUDIO_TRANSCRIPTION_SEGMENT_REVISION_UPDATE = "project/:projectId/audio_transcription/:audioTranscriptionId/segment/:segmentId/revision/:id";
    
}