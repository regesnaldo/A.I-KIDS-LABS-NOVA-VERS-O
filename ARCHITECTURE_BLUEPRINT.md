# A.I. KIDS LABS - Architectural Blueprint (Netflix Style)

> "Architecture is about making important decisions that are hard to change later."

This document outlines the strategic technical vision to transform A.I. KIDS LABS from a local MVP into a global, scalable educational streaming platform inspired by Netflix's engineering principles.

## 1. Structure: The Skeleton (Cloud & Scale)

### Vision
A distributed system where failures in one component do not affect the whole ("Bulkhead Pattern").

### Transition Plan
1.  **Frontend Hosting**: 
    *   **Current**: Local Vite.
    *   **Target**: Netlify or Vercel (Global Edge Network).
    *   **Why**: Instant loading regardless of user location.

2.  **Backend Evolution**:
    *   **Current**: Monolithic Node.js/Express.
    *   **Target**: Serverless Functions (AWS Lambda) or Containerized Microservices (AWS ECS/Fargate).
    *   **Service Split**:
        *   `Auth Service`: Handles Login/Registration (High Security).
        *   `Content Service`: Delivers Module Metadata (High Availability).
        *   `Progress Service`: Writes frequent updates (High Write Throughput).
        *   `Recommendation Service`: Python/AI based (Heavy Compute).

3.  **Storage**:
    *   **Current**: JSON Files / MongoDB (Local).
    *   **Target**: MongoDB Atlas (Cloud) + Redis (Caching).
    *   **Data Lake**: AWS S3 for storing raw educational assets (videos, 3D models).

## 2. Tools: The Gears (Performance & Resume)

### Resume Playback ("Continue Watching")
We have implemented the foundational schema to support Netflix-style continuity.

*   **Implementation**: `User.progress.history` array.
*   **Data Point**: `stoppedAt` (timestamp in seconds).
*   **Behavior**: When a user re-opens a module, the player checks this timestamp and seeks automatically.

### Video Delivery (Open Connect Inspiration)
*   **Current**: Local static files.
*   **Target**: Adaptive Bitrate Streaming (HLS/DASH).
*   **Technology**: AWS MediaConvert or Mux.
*   **Benefit**: If a child has slow internet, the video quality drops (720p -> 480p) but *never stops playing*.

## 3. Intelligence: The Brain (AI & Personalization)

### Recommendation Engine
A basic rule-based engine has been deployed to `GET /api/modules/recommendations`.

*   **Logic Level 1 (Immediate)**: If a module was started but not finished -> "Continue Watching".
*   **Logic Level 2 (Sequential)**: If Module 1 is done -> Suggest Module 2.
*   **Logic Level 3 (Discovery)**: If User likes "Robotics" -> Suggest other "Robotics" modules (Tag based).
*   **Future State**: Collaborative Filtering (Python/Scikit-learn) predicting what a child *will* like based on similar peers.

## 4. Immediate Roadmap (Next Steps)

1.  **Deploy Database**: Move from `users.json` to MongoDB Atlas Free Tier.
2.  **Frontend Player**: Update the React VideoPlayer component to send `stoppedAt` heartbeats every 10 seconds to `/api/modules/:id/progress`.
3.  **CDN**: Upload video assets to an S3 bucket and serve via CloudFront.

---
*Architected by: A.I. Senior Pair-Programmer*
