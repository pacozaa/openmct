/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define,describe,it,expect,beforeEach,waitsFor,jasmine */

define(
    ['../src/InspectorController'],
    function (InspectorController) {
        "use strict";

        describe("The inspector controller ", function () {
            var mockScope,
                mockDomainObject,
                mockTypeCapability,
                mockTypeDefinition,
                mockPolicyService,
                controller;

            beforeEach(function(){
                mockTypeDefinition = {
                    inspector:
                        {
                            'regions': [
                                {'name': 'Part One'},
                                {'name': 'Part Two'}
                            ]
                        }
                };

                mockTypeCapability = jasmine.createSpyObj('typeCapability', [
                    'getDefinition'
                ]);
                mockTypeCapability.getDefinition.andReturn(mockTypeDefinition);

                mockDomainObject = jasmine.createSpyObj('domainObject', [
                    'getCapability'
                ]);
                mockDomainObject.getCapability.andReturn(mockTypeCapability);

                mockPolicyService = jasmine.createSpyObj('policyService', [
                   'allow'
                ]);

                mockScope = {
                    domainObject: mockDomainObject
                };
            });

            it("filters out regions disallowed by region policy", function() {
                mockPolicyService.allow.andReturn(false);
                controller = new InspectorController(mockScope, mockPolicyService);
                expect(mockScope.regions.length).toBe(0);
            });

            it("does not filter out regions allowed by region policy", function() {
                mockPolicyService.allow.andReturn(true);
                controller = new InspectorController(mockScope, mockPolicyService);
                expect(mockScope.regions.length).toBe(2);
            });
        });
    }
);
