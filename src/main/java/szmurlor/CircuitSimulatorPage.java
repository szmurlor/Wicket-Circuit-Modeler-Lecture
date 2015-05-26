package szmurlor;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import szmurlor.panels.AddressPanel;
import szmurlor.panels.CircuitSimulatorPanel;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

public class CircuitSimulatorPage extends BasePage {
	private static final long serialVersionUID = 1L;

    public CircuitSimulatorPage(final PageParameters parameters) {
		super(parameters);

        add( new AddressPanel("address") );
        add( new CircuitSimulatorPanel("simulator"));
    }
}
