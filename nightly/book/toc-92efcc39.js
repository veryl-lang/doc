// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="01_introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="02_features.html"><strong aria-hidden="true">2.</strong> Features</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="03_getting_started.html"><strong aria-hidden="true">3.</strong> Getting Started</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="03_getting_started/01_installation.html"><strong aria-hidden="true">3.1.</strong> Installation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="03_getting_started/02_hello_world.html"><strong aria-hidden="true">3.2.</strong> Hello, World!</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="04_code_examples.html"><strong aria-hidden="true">4.</strong> Code Examples</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="04_code_examples/01_module.html"><strong aria-hidden="true">4.1.</strong> Module</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="04_code_examples/02_instantiation.html"><strong aria-hidden="true">4.2.</strong> Instantiation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="04_code_examples/03_interface.html"><strong aria-hidden="true">4.3.</strong> Interface</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="04_code_examples/04_package.html"><strong aria-hidden="true">4.4.</strong> Package</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="05_language_reference.html"><strong aria-hidden="true">5.</strong> Language Reference</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/01_source_code_structure.html"><strong aria-hidden="true">5.1.</strong> Source Code Structure</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/02_lexical_structure.html"><strong aria-hidden="true">5.2.</strong> Lexical Structure</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/02_lexical_structure/01_operator.html"><strong aria-hidden="true">5.2.1.</strong> Operator</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/02_lexical_structure/02_number.html"><strong aria-hidden="true">5.2.2.</strong> Number</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/02_lexical_structure/03_array_literal.html"><strong aria-hidden="true">5.2.3.</strong> Array Literal</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/03_data_type.html"><strong aria-hidden="true">5.3.</strong> Data Type</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/03_data_type/01_builtin_type.html"><strong aria-hidden="true">5.3.1.</strong> Builtin Type</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/03_data_type/02_user_defined_type.html"><strong aria-hidden="true">5.3.2.</strong> User Defined Type</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/03_data_type/03_array.html"><strong aria-hidden="true">5.3.3.</strong> Array</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/03_data_type/04_clock_reset.html"><strong aria-hidden="true">5.3.4.</strong> Clock / Reset</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression.html"><strong aria-hidden="true">5.4.</strong> Expression</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/01_operator_precedence.html"><strong aria-hidden="true">5.4.1.</strong> Operator Precedence</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/02_function_call.html"><strong aria-hidden="true">5.4.2.</strong> Function Call</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/03_concatenation.html"><strong aria-hidden="true">5.4.3.</strong> Concatenation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/04_if.html"><strong aria-hidden="true">5.4.4.</strong> If</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/05_case_switch.html"><strong aria-hidden="true">5.4.5.</strong> Case / Switch</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/06_bit_select.html"><strong aria-hidden="true">5.4.6.</strong> Bit Select</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/07_range.html"><strong aria-hidden="true">5.4.7.</strong> Range</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/08_msb_lsb.html"><strong aria-hidden="true">5.4.8.</strong> Msb / Lsb</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/09_inside_outside.html"><strong aria-hidden="true">5.4.9.</strong> Inside / Outside</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/10_type_cast.html"><strong aria-hidden="true">5.4.10.</strong> Type Cast</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/04_expression/11_struct_constructor.html"><strong aria-hidden="true">5.4.11.</strong> Struct Constructor</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement.html"><strong aria-hidden="true">5.5.</strong> Statement</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/01_assignment.html"><strong aria-hidden="true">5.5.1.</strong> Assignment</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/02_function_call.html"><strong aria-hidden="true">5.5.2.</strong> Function Call</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/03_if.html"><strong aria-hidden="true">5.5.3.</strong> If</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/04_case_switch.html"><strong aria-hidden="true">5.5.4.</strong> Case / Switch</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/05_for.html"><strong aria-hidden="true">5.5.5.</strong> For</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/06_return.html"><strong aria-hidden="true">5.5.6.</strong> Return</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/05_statement/07_let.html"><strong aria-hidden="true">5.5.7.</strong> Let</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration.html"><strong aria-hidden="true">5.6.</strong> Declaration</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/01_variable.html"><strong aria-hidden="true">5.6.1.</strong> Variable</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/02_parameter.html"><strong aria-hidden="true">5.6.2.</strong> Parameter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/03_register.html"><strong aria-hidden="true">5.6.3.</strong> Register</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/04_combinational.html"><strong aria-hidden="true">5.6.4.</strong> Combinational</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/05_assign.html"><strong aria-hidden="true">5.6.5.</strong> Assign</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/06_function.html"><strong aria-hidden="true">5.6.6.</strong> Function</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/07_initial_final.html"><strong aria-hidden="true">5.6.7.</strong> Initial / Final</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/08_attribute.html"><strong aria-hidden="true">5.6.8.</strong> Attribute</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/09_generate.html"><strong aria-hidden="true">5.6.9.</strong> Generate</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/10_instantiation.html"><strong aria-hidden="true">5.6.10.</strong> Instantiation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/11_named_block.html"><strong aria-hidden="true">5.6.11.</strong> Named Block</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/12_import_export.html"><strong aria-hidden="true">5.6.12.</strong> Import / Export</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/13_connect.html"><strong aria-hidden="true">5.6.13.</strong> Connect</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/06_declaration/14_block.html"><strong aria-hidden="true">5.6.14.</strong> Block</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/07_module.html"><strong aria-hidden="true">5.7.</strong> Module</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/08_interface.html"><strong aria-hidden="true">5.8.</strong> Interface</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/09_package.html"><strong aria-hidden="true">5.9.</strong> Package</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/10_systemverilog_interoperation.html"><strong aria-hidden="true">5.10.</strong> SystemVerilog Interoperation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/11_visibility.html"><strong aria-hidden="true">5.11.</strong> Visibility</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/12_foreign_language_integration.html"><strong aria-hidden="true">5.12.</strong> Foreign Language Integration</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/13_integrated_test.html"><strong aria-hidden="true">5.13.</strong> Integrated Test</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/14_generics.html"><strong aria-hidden="true">5.14.</strong> Generics</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/14_generics/01_default_parameter.html"><strong aria-hidden="true">5.14.1.</strong> Default Parameter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/14_generics/02_prototype.html"><strong aria-hidden="true">5.14.2.</strong> Prototype</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/15_clock_domain_annotation.html"><strong aria-hidden="true">5.15.</strong> Clock Domain Annotation</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/15_clock_domain_annotation/01_unsafe_cdc.html"><strong aria-hidden="true">5.15.1.</strong> Unsafe CDC</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/16_standard_library.html"><strong aria-hidden="true">5.16.</strong> Standard Library</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/17_alias.html"><strong aria-hidden="true">5.17.</strong> Alias</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model.html"><strong aria-hidden="true">5.18.</strong> Execution Model</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/01_variable_classification.html"><strong aria-hidden="true">5.18.1.</strong> Variable Classification</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/02_simulation_cycle.html"><strong aria-hidden="true">5.18.2.</strong> Simulation Cycle</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/03_assignment_semantics.html"><strong aria-hidden="true">5.18.3.</strong> Assignment Semantics</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/04_combinational_evaluation.html"><strong aria-hidden="true">5.18.4.</strong> Combinational Evaluation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/05_event_evaluation.html"><strong aria-hidden="true">5.18.5.</strong> Event Evaluation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/06_multi_clock.html"><strong aria-hidden="true">5.18.6.</strong> Multi-Clock Domains</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/18_execution_model/07_determinism.html"><strong aria-hidden="true">5.18.7.</strong> Determinism</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="05_language_reference/19_type_inference.html"><strong aria-hidden="true">5.19.</strong> Type Inference</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="06_development_environment.html"><strong aria-hidden="true">6.</strong> Development Environment</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration.html"><strong aria-hidden="true">6.1.</strong> Project Configuration</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration/01_build.html"><strong aria-hidden="true">6.1.1.</strong> Build</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration/02_format.html"><strong aria-hidden="true">6.1.2.</strong> Format</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration/03_lint.html"><strong aria-hidden="true">6.1.3.</strong> Lint</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration/04_test.html"><strong aria-hidden="true">6.1.4.</strong> Test</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration/05_publish.html"><strong aria-hidden="true">6.1.5.</strong> Publish</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/01_project_configuration/06_synth.html"><strong aria-hidden="true">6.1.6.</strong> Synth</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/02_dependencies.html"><strong aria-hidden="true">6.2.</strong> Dependencies</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/03_publish_project.html"><strong aria-hidden="true">6.3.</strong> Publish Project</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/04_directory_layout.html"><strong aria-hidden="true">6.4.</strong> Directory Layout</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/05_formatter.html"><strong aria-hidden="true">6.5.</strong> Formatter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/06_linter.html"><strong aria-hidden="true">6.6.</strong> Linter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/07_simulator.html"><strong aria-hidden="true">6.7.</strong> Simulator</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/08_language_server.html"><strong aria-hidden="true">6.8.</strong> Language Server</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/09_compatibility.html"><strong aria-hidden="true">6.9.</strong> Compatibility</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/10_documentation.html"><strong aria-hidden="true">6.10.</strong> Documentation</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/11_github_action.html"><strong aria-hidden="true">6.11.</strong> GitHub Action</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/12_source_map.html"><strong aria-hidden="true">6.12.</strong> Source Map</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/13_verylup.html"><strong aria-hidden="true">6.13.</strong> verylup</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/14_migrate_to_new_version.html"><strong aria-hidden="true">6.14.</strong> Migrate to New Version</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/15_docker_image.html"><strong aria-hidden="true">6.15.</strong> Docker Image</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/16_translator.html"><strong aria-hidden="true">6.16.</strong> Translator</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="06_development_environment/17_synthesizer.html"><strong aria-hidden="true">6.17.</strong> Synthesizer</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="07_appendix.html"><strong aria-hidden="true">7.</strong> Appendix</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="07_appendix/01_formal_syntax.html"><strong aria-hidden="true">7.1.</strong> Formal Syntax</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="07_appendix/02_semantic_error.html"><strong aria-hidden="true">7.2.</strong> Semantic Error</a></span></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

