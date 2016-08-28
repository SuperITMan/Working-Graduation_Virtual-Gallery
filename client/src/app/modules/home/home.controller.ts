"use strict";

import ILogService = angular.ILogService;
import IScope = angular.IScope;
import IStateService = angular.ui.IStateService;
import IResourceService = angular.resource.IResourceService;

import {IUsersApiService} from "../api/services/users-api.service";
import {IUser} from "../api/models/user.model";

import {AbstractStateController} from "../commons/controllers/abstract.state.controller";
import ITimeoutService = angular.ITimeoutService;
import IRootScopeService = angular.IRootScopeService;

export class HomeController extends AbstractStateController {
    public $resource:IResourceService;
    public $timeout:ITimeoutService;
    public users:Array<IUser>;
    public usersApiService:IUsersApiService;

    public loadProgressTask:Promise<any>;

    public static $inject: Array<string> = ["$log", "$state", "$scope", "$rootScope", "$timeout", "usersApiService"];

    public constructor(logger:ILogService, $state:IStateService, $scope:IScope, $rootScope:IRootScopeService,
                       $timeout:ITimeoutService, usersApiService:IUsersApiService) {
        super(logger, $state, $scope, $rootScope);
        this.usersApiService = usersApiService;
        this.$timeout = $timeout;
    }

    /**
     * Component lifecycle hook
     */
    private $onInit():void {
        this.logger.debug("Home controller loaded...");

        this.getUsers();
    }

    public getUsers ():any {
        let getUsersCallback:any = () => {
            this.usersApiService.getUsers().$promise.then((response:any) => {
                this.logger.debug("getUsers() -> Users loaded");
                this.users = response.data as Array<IUser>;
            });
        };

        this.loadProgressTask = this.$timeout(getUsersCallback) as Promise<any>;
    }
}
