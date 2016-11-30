<?php

namespace App\Presenters;

use Nette;
use Tracy\Debugger;

class HomepagePresenter extends Nette\Application\UI\Presenter {

    /** @var \IInquiryFormFactory @inject */
    public $inquiryFormFactory;

	public $adminEmail;

	/**
	 * @var Nette\Mail\IMailer
	 */
	public $mailer;
	public function injectMailer(Nette\Mail\IMailer $mailer) {
		$this->mailer = $mailer;
	}

	/**
	 * @param IInquiryFormFactory $inquiryFormFactory
	 */
	public function __construct(\Nette\DI\Container $context = NULL) {
		parent::__construct($context);
	}

    public function startup() {
        parent::startup();

        if (!$this->session->isStarted()) {
            $this->session->start();
        }

        $parameters = $this->context->parameters;
        $this->template->debugMode = $parameters['debugMode'];
        $this->adminEmail = $parameters["adminEmail"];
        $this->template->author = $parameters['author'];
        $this->template->lang = $parameters['primaryLang'];
        $this->template->meta = array(
            'title' => $parameters['title'],
            'description' => $parameters['description'],
            'keywords' => $parameters['keywords'],
        );
    }

	/**
	 * @return InquiryForm
	 */
    protected function createComponentInquiryForm() {
        $inquiry = $this->inquiryFormFactory->create();
        return $inquiry;
    }

    public function actionDefault() {
    }
}