import { Adapter } from "../native/adapter";
import { FetchRequest, FetchRequestDelegate } from "../../http/fetch_request";
import { FetchResponse } from "../../http/fetch_response";
import { History } from "./history";
import { PageSnapshot } from "./page_snapshot";
import { Action } from "../types";
import { PageView } from "./page_view";
export interface VisitDelegate {
    readonly adapter: Adapter;
    readonly history: History;
    readonly view: PageView;
    visitStarted(visit: Visit): void;
    visitCompleted(visit: Visit): void;
}
export declare enum TimingMetric {
    visitStart = "visitStart",
    requestStart = "requestStart",
    requestEnd = "requestEnd",
    visitEnd = "visitEnd"
}
export declare type TimingMetrics = Partial<{
    [metric in TimingMetric]: any;
}>;
export declare enum VisitState {
    initialized = "initialized",
    started = "started",
    canceled = "canceled",
    failed = "failed",
    completed = "completed"
}
export declare type VisitOptions = {
    action: Action;
    historyChanged: boolean;
    referrer?: URL;
    snapshotHTML?: string;
    response?: VisitResponse;
};
export declare type VisitResponse = {
    statusCode: number;
    responseHTML?: string;
};
export declare enum SystemStatusCode {
    networkFailure = 0,
    timeoutFailure = -1,
    contentTypeMismatch = -2
}
export declare class Visit implements FetchRequestDelegate {
    readonly delegate: VisitDelegate;
    readonly identifier: string;
    readonly restorationIdentifier: string;
    readonly action: Action;
    readonly referrer?: URL;
    readonly timingMetrics: TimingMetrics;
    followedRedirect: boolean;
    frame?: number;
    historyChanged: boolean;
    location: URL;
    redirectedToLocation?: URL;
    request?: FetchRequest;
    response?: VisitResponse;
    scrolled: boolean;
    snapshotHTML?: string;
    snapshotCached: boolean;
    state: VisitState;
    constructor(delegate: VisitDelegate, location: URL, restorationIdentifier: string | undefined, options?: Partial<VisitOptions>);
    get adapter(): Adapter;
    get view(): PageView;
    get history(): History;
    get restorationData(): import("./history").RestorationData;
    start(): void;
    cancel(): void;
    complete(): void;
    fail(): void;
    changeHistory(): void;
    issueRequest(): void;
    simulateRequest(): void;
    startRequest(): void;
    recordResponse(response?: VisitResponse | undefined): void;
    finishRequest(): void;
    loadResponse(): void;
    getCachedSnapshot(): PageSnapshot | undefined;
    getPreloadedSnapshot(): PageSnapshot | undefined;
    hasCachedSnapshot(): boolean;
    loadCachedSnapshot(): void;
    followRedirect(): void;
    requestStarted(): void;
    requestPreventedHandlingResponse(request: FetchRequest, response: FetchResponse): void;
    requestSucceededWithResponse(request: FetchRequest, response: FetchResponse): Promise<void>;
    requestFailedWithResponse(request: FetchRequest, response: FetchResponse): Promise<void>;
    requestErrored(request: FetchRequest, error: Error): void;
    requestFinished(): void;
    performScroll(): void;
    scrollToRestoredPosition(): true | undefined;
    scrollToAnchor(): true | undefined;
    scrollToTop(): void;
    recordTimingMetric(metric: TimingMetric): void;
    getTimingMetrics(): TimingMetrics;
    getHistoryMethodForAction(action: Action): (data: any, title: string, url?: string | null | undefined) => void;
    hasPreloadedResponse(): boolean;
    shouldIssueRequest(): boolean;
    cacheSnapshot(): void;
    render(callback: () => Promise<void>): Promise<void>;
    cancelRender(): void;
}
