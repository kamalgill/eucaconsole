/**
 * @fileOverview Stack update page JS
 * @requires AngularJS
 *
 */

// Launch Instance page includes the Tag Editor, the Image Picker, BDM editor, and security group rules editor
angular.module('StackUpdate', ['EucaConsoleUtils', 'localytics.directives', 'StackAWSDialogs'])
    .directive('file', function(){
        return {
            restrict: 'A',
            link: function($scope, el, attrs){
                el.bind('change', function(event){
                    $scope.templateFiles = event.target.files;
                    $scope.templateIdent = event.target.files[0].name;
                    $scope.$apply();
                    $scope.checkRequiredInput();
                    if ($scope.templateIdent !== undefined) {
                        $scope.getStackTemplateInfo();
                    }
                });
            }
        };
    })
    .controller('StackUpdateCtrl', function ($scope, $http, $timeout, eucaHandleError, eucaUnescapeJson) {
        $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $scope.expanded = false;
        $scope.stackForm = $('#stack-update-form');
        $scope.s3TemplateKey = undefined;
        $scope.stackTemplateEndpoint = '';
        $scope.templateFiles = [];
        $scope.summarySection = $('.summary');
        $scope.currentStepIndex = 1;
        $scope.step1Invalid = true;
        $scope.step2Invalid = true;
        $scope.imageJsonURL = '';
        $scope.isNotValid = true;
        $scope.loading = false;
        $scope.paramModels = {};
        $scope.serviceList = undefined;
        $scope.resourceList = undefined;
        $scope.propertyList = undefined;
        $scope.parameterList = undefined;
        $scope.isCreating = false;
        $scope.codeEditor = null;
        $scope.initController = function (optionsJson) {
            var options = JSON.parse(eucaUnescapeJson(optionsJson));
            $scope.stackTemplateEndpoint = options.stack_template_url;
            $scope.templateReadEndpoint = options.stack_template_read_url;
            $scope.setInitialValues();
            $scope.setWatchers();
            $scope.setFocus();
            $scope.initCodeMirror();
            $scope.getStackTemplateInfo();
        };
        $scope.setFocus = function () {
            $timeout(function() {
                $("#name").focus();
            }, 50);
        };
        // This timer code will trigger the change event if someone
        // types in the field and hasn't typed anything for 1 second
        $scope.url_timer = undefined;
        $('#template-url').on('keydown', function() {
            if ($scope.url_timer) {
                window.clearTimeout($scope.url_timer);
            }
            $scope.url_timer = window.setTimeout(function() {
                $scope.url_timer = undefined;
                $timeout(function() {
                    $scope.checkRequiredInput();
                    $scope.templateIdent = $scope.templateUrl;
                    if ($scope.templateIdent !== undefined) {
                        $scope.getStackTemplateInfo();
                    }
                });
            }, 1000);
        });
        $scope.setInitialValues = function () {
            $scope.inputtype = 'current';
        };
        $scope.checkRequiredInput = function () {
            if ($scope.currentStepIndex === 1) {
                $scope.isNotValid = false;
                $('#size-error').css('display', 'none');
                var val;
                switch ($scope.inputtype) {
                    case 'current':
                        break;
                    case 'file':
                        val = $scope.templateFiles;
                        if (val === undefined || val.length === 0) {
                            $scope.isNotValid = true;
                        }
                        if (val !== undefined && val.length > 0 && val[0].size > 460800) {
                            $('#size-error').css('display', 'block');
                            $scope.isNotValid = true;
                        }
                        break;
                    case 'url':
                        val = $scope.templateUrl;
                        if (val === undefined || val === '') {
                            $scope.isNotValid = true;
                        }
                        break;
                    default:
                        $scope.isNotValid = true;
                }
            } else if ($scope.currentStepIndex === 2) {
                $scope.isNotValid = false;
                angular.forEach($scope.parameters, function(param, idx) {
                    var val = $scope.paramModels[param.name];
                    if (val === undefined) {
                        $scope.isNotValid = true;
                    }
                });
            }
        };
        $scope.setWatchers = function () {
            $scope.$watch('inputtype', function(){
                switch ($scope.inputtype) {
                    case 'current':
                        $scope.templateFiles = undefined;
                        $('#template-file').val(undefined);
                        $scope.templateUrl = undefined;
                        $scope.templateIdent = undefined;
                        $scope.description = '';
                        break;
                    case 'file':
                        $scope.templateUrl = undefined;
                        $scope.templateIdent = undefined;
                        $scope.description = '';
                        break;
                    case 'url':
                        $scope.templateFiles = undefined;
                        $('#template-file').val(undefined);
                        $scope.templateIdent = undefined;
                        $scope.description = '';
                        break;
                }
                $scope.checkRequiredInput();
            });
            $scope.$watch('templateSample', function(){
                $scope.checkRequiredInput();
                if ($scope.templateSample !== undefined && $scope.templateSample !== '') {
                    $scope.templateIdent = $scope.templateSample.label;
                    if ($scope.templateIdent !== undefined) {
                        $scope.getStackTemplateInfo();
                    }
                }
            });
            $scope.$watch('currentStepIndex', function(){
                 $scope.setUpdateFocus($scope.currentStepIndex);
            });
            $scope.$watch('inputtype', function() {
                if ($scope.inputtype === 'text') {
                    $timeout(function() {
                        $('#sample-template').focus();
                    });
                }
                else {
                    if ($scope.inputtype === 'url') {
                        $timeout(function() {
                            $('#template-url').focus();
                        });
                    }
                }
            });
        };
        $scope.setUpdateFocus = function (stepIdx) {
            var tabElement = $(document).find('#tabStep'+stepIdx).get(0);
            if (!!tabElement) {
                tabElement.focus();
            }
        };
        $scope.visitNextStep = function (nextStep, $event) {
            // Trigger form validation before proceeding to next step
            $scope.stackForm.trigger('validate');
            var currentStep = nextStep - 1,
                tabContent = $scope.stackForm.find('#step' + currentStep),
                invalidFields = tabContent.find('[data-invalid]');
            if (invalidFields.length > 0 || $scope.isNotValid === true) {
                invalidFields.focus();
                $event.preventDefault();
                if( $scope.currentStepIndex > nextStep){
                    $scope.currentStepIndex = nextStep;
                    $scope.checkRequiredInput();
                }
                return false;
            }
            // Handle the unsaved tag issue
            var existsUnsavedTag = false;
            $('input.taginput').each(function(){
                if ($(this).val() !== '') {
                    existsUnsavedTag = true;
                }
            });
            if (existsUnsavedTag) {
                $event.preventDefault(); 
                $('#unsaved-tag-warn-modal').foundation('reveal', 'open');
                return false;
            }
            if (nextStep === 2 && $scope.step1Invalid) { $scope.clearErrors(2); $scope.step1Invalid = false; }
            
            // since above lines affects DOM, need to let that take affect first
            $timeout(function() {
                // If all is well, hide current and show new tab without clicking
                // since clicking invokes this method again (via ng-click) and
                // one ng action must complete before another can start
                var hash = "step"+nextStep;
                $("#update-tabs").children("dd").each(function() {
                    var link = $(this).find("a");
                    if (link.length !== 0) {
                        var id = link.attr("href").substring(1);
                        var $container = $("#" + id);
                        $(this).removeClass("active");
                        $container.removeClass("active");
                        if (id === hash || $container.find("#" + hash).length) {
                            $(this).addClass("active");
                            $container.addClass("active");
                        }
                    }
                });
                // Unhide appropriate step in summary
                $scope.summarySection.find('.step' + nextStep).removeClass('hide');
                $scope.currentStepIndex = nextStep;
                $scope.checkRequiredInput();
                $scope.isHelpExpanded = false;
            },50);
            if (nextStep === 2) {
                $scope.updateChosenIds();
            }
        };
        $scope.updateChosenIds = function() {
            $timeout(function() {
                // hack to update chosen divs to match selects (fixing directive ordering)
                var elems = $('select[chosen]');
                angular.forEach($('select[chosen]'), function(value, key) {
                    value.nextSibling.id = value.id + "_chosen";
                });
            }, 1000);
        };
        $scope.clearErrors = function(step) {
            $('#step'+step).find('div.error').each(function(idx, val) {
                $(val).removeClass('error');
            });
        };
        $scope.getStackTemplateInfo = function () {
            if ($scope.loading === true) {
                return;
            }
            $scope.description = '';
            $scope.parameters = undefined;
            $scope.s3TemplateKey = undefined;
            $('#s3-template-key').val('');
            $scope.serviceList = undefined;
            $scope.resourceList = undefined;
            $scope.parameterList = undefined;
            $scope.propertyList = undefined;
            var fd = new FormData();
            // fill from actual form
            angular.forEach($('form').serializeArray(), function(value, key) {
                this.append(value.name, value.value);
            }, fd);
            if ($scope.inputtype === 'current') {
                if ($scope.stackTemplate) {
                    fd.append('template-body', $scope.stackTemplate);
                }
            }
            // Add file
            if ($scope.inputtype === 'file') {
                var file = $scope.templateFiles[0];
                // another check to ensure we don't upload something too large
                if (file.size > 460800) {
                    return;
                }
                fd.append('template-file', file);
            }
            if ($scope.inputtype === 'url' && $scope.templateUrl === '') {
                return;
            }
            $scope.loading = true;
            var promise = $http.post($scope.stackTemplateEndpoint, fd, {
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
            }).then(function successCallback(oData) {
                var results = oData.data ? oData.data.results : [];
                if (results) {
                    $scope.loading = false;
                    $scope.s3TemplateKey = results.template_key;
                    $scope.description = results.description;
                    $scope.templateBucket = results.template_bucket;
                    if (results.service_list && results.service_list.length > 0) {
                        $scope.serviceList = results.service_list;
                    }
                    if (results.resource_list && results.resource_list.length > 0) {
                        $scope.resourceList = results.resource_list;
                    }
                    if ($scope.serviceList || $scope.resourceList) {
                        $scope.expanded = false;
                        $('#aws-error-modal').foundation('reveal', 'open');
                        $scope.templateUrl = undefined;
                        $scope.templateIdent = undefined;
                        $scope.description = '';
                        $scope.isNotValid = true;
                        return;
                    }
                    if (results.parameter_list && results.parameter_list.length) {
                        $scope.parameterList = results.parameter_list;
                    }
                    if (results.property_list && results.property_list.length > 0) {
                        $scope.propertyList = results.property_list;
                    }
                    if ($scope.parameterList || $scope.propertyList) {
                        $scope.expanded = false;
                        $scope.showAWSWarn();
                    }
                    $scope.parameters = results.parameters;
                    if ($scope.parameters !== undefined) {
                        angular.forEach($scope.parameters, function(param, idx) {
                            $scope.paramModels[param.name] = param.default;
                            if (param.options !== undefined) {
                                for (var i=0; i<param.options.length; i++) {
                                    param.options[i] = {id:param.options[i][0], label:param.options[i][1]};
                                }
                            }
                        });
                    }
                    $scope.summarySection.find('.step2').removeClass('hide');
                    $scope.checkRequiredInput();
                    if ($scope.parameters !== undefined) {
                        $timeout(function() {
                            $scope.parameters.forEach(function(param) {
                                if (param.options !== undefined) {
                                    param.options.forEach(function(option) {
                                        if (option.id == param.default) {
                                            $scope.paramModels[param.name] = option;
                                        }
                                    });
                                }
                            });
                        });
                    }
                    $timeout(function() {
                        $(document).foundation('tooltip', 'reflow');
                    }, 1000);
                    $scope.updateChosenIds();
                }
            }, function errorCallback(errData) {
                $scope.loading = false;
                eucaHandleError(errData.statusText, errData.status);
            });
            return promise;
        };
        $scope.showAWSWarn = function () {
            var thisKey = "do-not-show-aws-template-warning";
            if (Modernizr.localstorage && localStorage.getItem(thisKey) !== "true") {
                var modal = $('#aws-warn-modal');
                modal.foundation('reveal', 'open');
                modal.on('click', '#convert_template_submit_button', function(){
                    if (modal.find('input#check-do-not-show-me-again').is(':checked')) {
                        if (Modernizr.localstorage) {
                            localStorage.setItem(thisKey, "true");
                        }
                    }
                });
            }
            else {
                $scope.convertTemplate();
            }
        };
        $scope.paramValue = function(name) {
            var ret = $scope.paramModels[name];
            if (typeof ret == "object") {
                ret = ret.label;
            }
            return ret;
        };
        $scope.initCodeMirror = function () {
            var templateTextarea = document.getElementById('template-area');
            $scope.codeEditor = CodeMirror.fromTextArea(templateTextarea, {
                mode: {name:"javascript", json:true},
                lineWrapping: true,
                styleActiveLine: true,
                lineNumbers: true,
                readOnly: false
            });
        };
        $scope.clearCodeEditor = function () {
            $scope.codeEditor.setValue('');
            $scope.codeEditor.clearHistory();
        };
        $scope.editTemplate = function ($event) {
            $event.preventDefault();
            $('#json-error').css('display', 'none');
            $scope.clearCodeEditor();
            $scope.savingTemplate = false;
            var editModal = $('#edit-template-modal');
            editModal.foundation('reveal', 'open');
            editModal.on('close.fndtn.reveal', function() {
                $scope.clearCodeEditor();
            });
            $scope.stackTemplate = ''; // clear any previous policy
            $http.get($scope.templateReadEndpoint).success(function(oData) {
                var results = oData ? oData.results : '';
                $scope.stackTemplate = results;
                $scope.codeEditor.setValue($scope.stackTemplate);
                $scope.codeEditor.focus();
            }).error(function (oData, status) {
                eucaHandleError(oData, status);
            });
        };
        $scope.saveTemplate = function ($event) {
            $event.preventDefault();
            try {
                $('#json-error').css('display', 'none');
                var policy_json = $scope.codeEditor.getValue();
                JSON.parse(policy_json);
                // now, save the template
                $scope.savingTemplate = true;
                $scope.getStackTemplateInfo().then(function successCallback(oData) {
                    $('#edit-template-modal').foundation('reveal', 'close');
                    $scope.visitNextStep(2);
                });
            } catch (e) {
                $scope.savingTemplate = false;
                $('#json-error').text(e);
                $('#json-error').css('display', 'block');
            }
        };
    })
;


